import { HistoryEntryProps } from "./helpers/history-entry";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getBinaryId } from "@/fhir/binaries";
import { PatientModel } from "@/fhir/models";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { searchProvenances } from "@/fhir/provenance";
import { excludeTagsinPatientRecordSearch } from "@/fhir/search-helpers";
import { ResourceType, ResourceTypeString } from "@/fhir/types";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, getResourceNodes } from "@/services/fqs/client";
import { allergyQuery } from "@/services/fqs/queries/allergies";
import { conditionsQuery } from "@/services/fqs/queries/conditions";
import { isEqual, orderBy, uniqWith } from "@/utils/nodash";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export type UseHistoryProps<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>> = {
  resourceType: T;
  model: M;
  queryKey: string;
  valuesToDedupeOn: (m: M) => unknown;
  getHistoryEntry: (m: M) => HistoryEntryProps;
  getFiltersFQS?: (m: M) => object | undefined;
  clientSideFiltersFQS?: (model: M, resources: ResourceType<T>[]) => ResourceType<T>[];
};

export function useHistory<T extends ResourceTypeString, M extends FHIRModel<ResourceType<T>>>({
  resourceType,
  model,
  queryKey,
  valuesToDedupeOn,
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
    withTimerMetric(
      async (requestContext, patient) =>
        fetchResourcesFQS(
          resourceType,
          model,
          requestContext,
          patient,
          valuesToDedupeOn,
          getHistoryEntry,
          fqsProvenances.enabled,
          clientSideFiltersFQS,
          getFiltersFQS?.(model)
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

async function fetchResourcesFQS<
  T extends ResourceTypeString,
  M extends FHIRModel<ResourceType<T>>
>(
  resourceType: T,
  model: M,
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

    let filteredResources = filterLensAndSummary(resources, resourceType);

    if (clientSideFiltersFQS) {
      filteredResources = clientSideFiltersFQS(model, filteredResources);
    }

    const constructor = model.constructor as new (r: ResourceType<T>) => M;
    const models = filteredResources.map((c) => new constructor(c));

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
