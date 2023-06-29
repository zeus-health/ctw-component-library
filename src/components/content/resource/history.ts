import { SearchParams } from "fhir-kit-client";
import { GraphQLClient } from "graphql-request";
import { HistoryEntryProps } from "./helpers/history-entry";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getBinaryId } from "@/fhir/binaries";
import { getIncludedResources, getResources } from "@/fhir/bundle";
import { PatientModel } from "@/fhir/models";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";
import {
  excludeTagsinPatientRecordSearch,
  searchBuilderRecords,
  searchCommonRecords,
} from "@/fhir/search-helpers";
import { ResourceMap, ResourceType, ResourceTypeString } from "@/fhir/types";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { filterResourcesByBuilderId } from "@/services/common";
import { createGraphqlClient, getHistoryResources, getResourceNodes } from "@/services/fqs/client";
import { allergyQuery } from "@/services/fqs/queries/allergies";
import { conditionsQuery } from "@/services/fqs/queries/conditions";
import { versionsQuery } from "@/services/fqs/queries/versions";
import { compact, isEqual, orderBy, some, uniqWith } from "@/utils/nodash";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export type UseHistoryProps<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>> = {
  resourceType: T;
  model: M;
  queryKey: string;
  includeVersionHistory?: boolean;
  valuesToDedupeOn: (m: M) => unknown;
  getSearchParams: (m: M) => SearchParams;
  getHistoryEntry: (m: M) => HistoryEntryProps;
  getFiltersFQS?: (m: M) => object | undefined;
  clientSideFiltersFQS?: (model: M, resources: ResourceType<T>[]) => ResourceType<T>[];
};

export function useHistory<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>>({
  resourceType,
  model,
  queryKey,
  includeVersionHistory = true,
  valuesToDedupeOn,
  getSearchParams,
  getHistoryEntry,
  getFiltersFQS,
  clientSideFiltersFQS,
}: UseHistoryProps<T, M>) {
  const fqsProvenances = useFQSFeatureToggle("provenances");
  const useHistoryUnleash = useFQSFeatureToggle("useHistory");

  return useQueryWithPatient(
    queryKey,
    [
      model,
      useHistoryUnleash.enabled,
      useHistoryUnleash.ready,
      fqsProvenances.ready,
      fqsProvenances.enabled,
    ],
    useHistoryUnleash.enabled
      ? withTimerMetric(
          async (requestContext, patient) =>
            fetchResourcesFQS(
              resourceType,
              model,
              includeVersionHistory,
              requestContext,
              patient,
              valuesToDedupeOn,
              getHistoryEntry,
              fqsProvenances.enabled,
              clientSideFiltersFQS,
              getFiltersFQS?.(model)
            ),
          `req.${model.resourceType.toLowerCase()}_history`,
          ["fqs"]
        )
      : withTimerMetric(
          async (requestContext, patient) =>
            fetchResourcesODS(
              resourceType,
              model,
              includeVersionHistory,
              requestContext,
              patient,
              valuesToDedupeOn,
              getHistoryEntry,
              getSearchParams
            ),
          `req.${model.resourceType.toLowerCase()}_history`
        ),
    fqsProvenances.ready && useHistoryUnleash.ready
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
      throw new Error(`Resource type to FQS query not implemented yet for ${resourceType}`);
  }
}

async function getVersionHistoryFQS<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  graphClient: GraphQLClient,
  resources: ResourceType<T>[]
): Promise<ResourceType<T>[]> {
  let builderResources = filterResourcesByBuilderId(resources, requestContext.builderId);

  // Filter out any resources that are currently marked as entered in error.
  builderResources = builderResources.filter((r) => !wasEnteredInError(r));

  const resourceIds = compact(builderResources.map((resource) => resource.id));

  if (!resourceIds.length) {
    return [];
  }

  const versionQuery = versionsQuery(resourceType, resourceIds);

  const versions = getHistoryResources<T>(await graphClient.request(versionQuery));

  // Don't show any versions that were entered in error.
  return versions.filter((version) => !wasEnteredInError(version));
}

async function fetchResourcesFQS<
  T extends ResourceTypeString,
  M extends FHIRModel<ResourceType<T>>
>(
  resourceType: T,
  model: M,
  includeVersionHistory: boolean,
  requestContext: CTWRequestContext,
  patient: PatientModel,
  valuesToDedupeOn: (m: M) => unknown,
  getHistoryEntry: (m: M) => HistoryEntryProps,
  enableFQSProvenances: boolean,
  clientSideFiltersFQS?: (model: M, resources: ResourceType<T>[]) => ResourceType<T>[],
  filter?: object | undefined
) {
  try {
    const graphClient = createGraphqlClient(requestContext);

    const resources =
      filter || clientSideFiltersFQS
        ? getResourceNodes<T>(
            await graphClient.request(getResourceFQSQuery(resourceType), {
              upid: patient.UPID,
              cursor: "",
              first: 1000,
              sort: {
                lastUpdated: "DESC",
              },
              filter,
            })
          )
        : [model.resource];

    let versions: ResourceType<T>[] = [];

    let filteredResources = filterLensAndSummary(resources, resourceType);

    if (clientSideFiltersFQS) {
      filteredResources = clientSideFiltersFQS(model, filteredResources);
    }

    if (includeVersionHistory) {
      versions = await getVersionHistoryFQS(
        resourceType,
        requestContext,
        graphClient,
        filteredResources
      );
    }

    const constructor = model.constructor as new (r: ResourceType<T>) => M;
    const models = [...filteredResources, ...versions].map((c) => new constructor(c));

    const entries = dedupeHistory(models, valuesToDedupeOn).map(getHistoryEntry);

    // Fetch provenances and add binaryId to each entry.
    const provenances = await searchProvenances(requestContext, models, enableFQSProvenances);
    entries.forEach((entry) => {
      // eslint-disable-next-line no-param-reassign
      entry.binaryId = getBinaryId(provenances, entry.id);
    });

    return entries;
  } catch (e) {
    throw Telemetry.logError(
      e as Error,
      `Failed fetching ${resourceType} history for patient via FQS: ${patient.UPID}}`
    );
  }
}

async function fetchResourcesODS<
  T extends ResourceTypeString,
  M extends FHIRModel<ResourceType<T>>
>(
  resourceType: T,
  model: M,
  includeVersionHistory: boolean,
  requestContext: CTWRequestContext,
  patient: PatientModel,
  valuesToDedupeOn: (m: M) => unknown,
  getHistoryEntry: (m: M) => HistoryEntryProps,
  getSearchParams: (m: M) => SearchParams
) {
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
    const models = [...resources, ...versions].map((c) => new constructor(c, includedResources));

    const entries = dedupeHistory(models, valuesToDedupeOn).map(getHistoryEntry);

    // Fetch provenances and add binaryId to each entry.
    const provenances = await searchProvenances(requestContext, models, false);
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
}

export function filterLensAndSummary<T extends ResourceTypeString>(
  resources: ResourceType<T>[],
  resourceType: T
) {
  // filter out anything we don't want
  const filteredResources = resources.filter((resource) => {
    // no tags are allowed through (should be an edge case)
    if (!resource.meta || !resource.meta.tag) {
      return true;
    }

    const hasExcludableTag =
      resource.meta.tag.filter((tag) =>
        excludeTagsinPatientRecordSearch(resourceType).includes(`${tag.system}|${tag.code}`)
      ).length > 0;

    return !hasExcludableTag;
  });

  return filteredResources;
}
