import { SearchParams } from "fhir-kit-client";
import { GraphQLClient } from "graphql-request";
import { HistoryEntryProps } from "./helpers/history-entry";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getBinaryId } from "@/fhir/binaries";
import { getIncludedResources, getResources } from "@/fhir/bundle";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";
import { searchBuilderRecords, searchCommonRecords } from "@/fhir/search-helpers";
import { ResourceMap, ResourceType, ResourceTypeString } from "@/fhir/types";
import { createGraphqlClient, GenericResponse } from "@/services/fqs/client";
import { allergyQuery } from "@/services/fqs/queries/allergies";
import { conditionsQuery } from "@/services/fqs/queries/conditions";
import { compact, isEqual, orderBy, some, uniqWith } from "@/utils/nodash";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";
import { T } from "vitest/dist/types-94cfe4b4";

export type UseHistoryProps<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>> = {
  resourceType: T;
  model: M;
  queryKey: string;
  includeVersionHistory?: boolean;
  valuesToDedupeOn: (m: M) => unknown;
  getSearchParams: (m: M) => SearchParams;
  getHistoryEntry: (m: M) => HistoryEntryProps;
  enableFQS?: boolean;
};

export function useHistory<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>>({
  resourceType,
  model,
  queryKey,
  includeVersionHistory = true,
  valuesToDedupeOn,
  getSearchParams,
  getHistoryEntry,
  enableFQS = false,
}: UseHistoryProps<T, M>) {
  return useQueryWithPatient(
    queryKey,
    [model],
    enableFQS
      ? withTimerMetric(
          async (requestContext, patient) => {
            try {
              const graphClient = createGraphqlClient(requestContext);
              const data = (await graphClient.request(getResourceFQSQuery(resourceType), {
                upid: patient.UPID,
                cursor: "",
                first: 1000,
                sort: {
                  lastUpdated: "DESC",
                },
              })) as GenericResponse<T>;

              const resources = data.GenericConnection.edges.map((x) => x.node);

              let versions: ResourceType<T>[] = [];
              if (includeVersionHistory) {
                versions = await getVersionHistoryFQS(resourceType, graphClient, patient.UPID);
              }
              const constructor = model.constructor as new (r: ResourceType<T> | T) => M;
              const models = [...resources, ...versions].map((c) => new constructor(c));

              const entries = dedupeHistory(models, valuesToDedupeOn).map(getHistoryEntry);

              // Fetch provenances and add binaryId to each entry.
              const provenances = await searchProvenances(requestContext, models);
              entries.forEach((entry) => {
                // eslint-disable-next-line no-param-reassign
                entry.binaryId = getBinaryId(provenances, entry.id);
              });

              return entries;
            } catch (e) {
              throw Telemetry.logError(
                e as Error,
                `Failed fetching ${resourceType} history for patient: ${patient.UPID}}`
              );
            }
          },
          `req.${model.resourceType.toLowerCase()}_history`,
          ["fqs"]
        )
      : withTimerMetric(async (requestContext, patient) => {
          try {
            const searchParams = {
              ...getSearchParams(model),
              patientUPID: patient.UPID,
            };

            const { resources, bundle } = await searchCommonRecords(
              resourceType,
              requestContext,
              searchParams
            );
            const includedResources = getIncludedResources(bundle);

            let versions: ResourceType<T>[] = [];
            if (includeVersionHistory) {
              versions = await getVersionHistory(resourceType, requestContext, searchParams);
            }
            const constructor = model.constructor as new (
              r: ResourceType<T>,
              includedRes: ResourceMap
            ) => M;
            const models = [...resources, ...versions].map(
              (c) => new constructor(c, includedResources)
            );

            const entries = dedupeHistory(models, valuesToDedupeOn).map(getHistoryEntry);

            // Fetch provenances and add binaryId to each entry.
            const provenances = await searchProvenances(requestContext, models);
            entries.forEach((entry) => {
              // eslint-disable-next-line no-param-reassign
              entry.binaryId = getBinaryId(provenances, entry.id);
            });

            return entries;
          } catch (e) {
            throw Telemetry.logError(
              e as Error,
              `Failed fetching ${resourceType} history for patient: ${patient.UPID}}`
            );
          }
        }, `req.${model.resourceType.toLowerCase()}_history`),
    !!model
  );
}

export function dedupeHistory<T extends fhir4.Resource, M extends FHIRModel<T>>(
  resources: M[],
  valuesToDedupeOn: (m: M) => unknown
) {
  // We sort by isEnriched because we want enriched records to be preferred in uniqWith function.
  const enrichedFirst = orderBy(resources, ["isEnriched"], "desc");

  return uniqWith(enrichedFirst, (a, b) => isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b)));
}

export async function getVersionHistory<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams: SearchParams
): Promise<ResourceType<T>[]> {
  const response = await searchBuilderRecords(resourceType, requestContext, searchParams);

  // Filter out any resources that are currently marked as entered in error.
  const resources = response.resources.filter((r) => !wasEnteredInError(r));

  const builderIds = compact(resources.map((resource) => resource.id));

  if (!builderIds.length) {
    return [];
  }

  const bundle: fhir4.Bundle = {
    resourceType: "Bundle",
    id: `bundle-history-${resourceType}`,
    type: "batch",
    entry: builderIds.map((id) => ({
      request: {
        method: "GET",
        url: `/${resourceType}/${id}/_history`,
      },
    })) as fhir4.BundleEntry<fhir4.FhirResource>[],
  };

  const versions = getResources(
    await requestContext.fhirClient.batch({
      body: {
        ...bundle,
        type: "batch",
      },
    }),
    resourceType
  );

  // Don't show any versions that were entered in error.
  return versions.filter((version) => !wasEnteredInError(version));
}

// Look for either status or verificationStatus to be entered-in-error.
// This should cover all resources we use.
function wasEnteredInError(resource: fhir4.FhirResource) {
  if ("status" in resource && resource.status === "entered-in-error") {
    return true;
  }

  if (
    "verificationStatus" in resource &&
    some(resource.verificationStatus?.coding, { code: "entered-in-error" })
  ) {
    return true;
  }

  return false;
}

function getResourceFQSQuery(resourceType: ResourceTypeString) {
  switch (resourceType) {
    case "Condition":
      return conditionsQuery;
    case "AllergyIntolerance":
      return allergyQuery;
    default:
      return "";
  }
}

export async function getVersionHistoryFQS<T extends ResourceTypeString>(
  resourceType: T,
  graphClient: GraphQLClient,
  patientUPID: string
): Promise<ResourceType<T>[]> {
  const response = (await graphClient.request(getResourceFQSQuery(resourceType), {
    upid: patientUPID,
    cursor: "",
    first: 1000,
    sort: {
      lastUpdated: "DESC",
    },
  })) as GenericResponse<T>;
  // const response = await searchBuilderRecords(resourceType, requestContext);

  let resources = response.GenericConnection.edges.map((x) => x.node);

  // Filter out any resources that are currently marked as entered in error.
  resources = resources.resources.filter((r) => !wasEnteredInError(r));

  const resourceIds = compact(resources.map((resource) => resource.id));

  if (!resourceIds.length) {
    return [];
  }

  const bundle: fhir4.Bundle = {
    resourceType: "Bundle",
    id: `bundle-history-${resourceType}`,
    type: "batch",
    entry: resourceIds.map((id) => ({
      request: {
        method: "GET",
        url: `/${resourceType}/${id}/_history`,
      },
    })) as fhir4.BundleEntry<fhir4.FhirResource>[],
  };

  const versions = getResources(
    await requestContext.fhirClient.batch({
      body: {
        ...bundle,
        type: "batch",
      },
    }),
    resourceType
  );

  // Don't show any versions that were entered in error.
  return versions.filter((version) => !wasEnteredInError(version));
}
