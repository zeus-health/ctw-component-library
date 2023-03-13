import { SearchParams } from "fhir-kit-client";
import { getResources } from "./bundle";
import {
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_LENS,
  SYSTEM_ZUS_OWNER,
  SYSTEM_ZUS_THIRD_PARTY,
  SYSTEM_ZUS_UNIVERSAL_ID,
  SYSTEM_ZUS_UPI_RECORD_TYPE,
} from "./system-urls";
import { ResourceType, ResourceTypeString } from "./types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { filter, find, mapValues, mergeWith } from "@/utils/nodash";

const MAX_COUNT = 250;

// Enumerating ALL of the third party tags.
const THIRD_PARTY_TAGS = [
  `${SYSTEM_ZUS_THIRD_PARTY}|surescripts`,
  `${SYSTEM_ZUS_THIRD_PARTY}|commonwell`,
  `${SYSTEM_ZUS_THIRD_PARTY}|elation`,
  `${SYSTEM_ZUS_THIRD_PARTY}|collective-medical`,
  `${SYSTEM_ZUS_THIRD_PARTY}|quest`,
];

// Enumerating ALL of the lens tags.
const LENS_TAGS = [
  `${SYSTEM_ZUS_LENS}|ActiveMedications`,
  `${SYSTEM_ZUS_LENS}|ChronicConditions`,
];

const UPI_TAGS = [`${SYSTEM_ZUS_UPI_RECORD_TYPE}|universal`];

const SUMMARY_TAGS = [`${SYSTEM_SUMMARY}|Common`];

// ODS must be specifically configured *by resource* to support the firstparty tag.
// This is a performance optimization to address slow queries using _tag:not.
const FIRST_PARTY_TAG_SUPPORTED_RESOURCES = [
  "Patient",
  "Condition",
  "Coverage",
  "Encounter",
  "MedicationStatement",
];

export type SearchReturn<T extends ResourceTypeString> = {
  bundle: fhir4.Bundle;
  total: number;
  resources: ResourceType<T>[];
};

// Performs a FHIR search for the given resourceType accross all resources
// the user has access to. This can include lens and third party resources!
// Returns {bundle: fhir4.Bundle, total: number, resources: ResourceType[]}.
// Usage: {bundle, total, resources: tasks} =
//          searchAllRecords("Task", requestContext, searchParams)
// NOTE: "patientUPID" is a special searchParam that will correctly
//       filter down to the resources pertaining to that patient UPID.
export async function searchAllRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const { patientUPID, _count, ...params } = searchParams ?? {};
  const fetchAll = typeof _count === "undefined";
  const count = fetchAll ? MAX_COUNT : _count;
  const bundle = (await requestContext.fhirClient.search({
    resourceType,
    searchParams: {
      ...params,
      _count: count,
      ...patientSearchParams(resourceType, patientUPID as string),
    },
  })) as fhir4.Bundle;

  const resources = getResources(bundle, resourceType);
  return { bundle, total: bundle.total ?? 0, resources };
}

// Like searchAllRecords, but only for resources from this builder.
export async function searchBuilderRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const nonBuilderTags = [
    ...THIRD_PARTY_TAGS,
    ...LENS_TAGS,
    ...SUMMARY_TAGS,
    ...UPI_TAGS,
  ];
  type FirstPartyParams = {
    _tag?: string[];
    firstparty?: boolean;
    "_tag:not"?: string[];
  };
  const firstPartyParams: FirstPartyParams = {};

  if (FIRST_PARTY_TAG_SUPPORTED_RESOURCES.includes(resourceType)) {
    firstPartyParams.firstparty = true;
  } else {
    firstPartyParams["_tag:not"] = nonBuilderTags;
  }

  const params = mergeParams(searchParams, firstPartyParams);
  return searchAllRecords(resourceType, requestContext, params);
}

// Like searchAllRecords, but filters down to lens records.
export type LensTag = "ActiveMedications" | "ChronicConditions";

export async function searchLensRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  lensTag: LensTag,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const tagFilter = [`${SYSTEM_ZUS_LENS}|${lensTag}`];
  const params = mergeParams(searchParams, {
    _tag: tagFilter,
  });
  const records = await searchAllRecords(resourceType, requestContext, params);

  const { entry, resources } = filterSearchReturnByBuilderId(
    records,
    requestContext.builderId
  );

  records.resources = resources;
  records.bundle.entry = entry;
  records.bundle.total = entry.length;
  records.total = resources.length;

  return records;
}

// Like searchAllRecords, but filters down to only summary records.
export async function searchSummaryRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const tagFilter = [...SUMMARY_TAGS];
  const params = mergeParams(searchParams, {
    _tag: tagFilter,
  });

  const records = await searchAllRecords(resourceType, requestContext, params);

  const { entry, resources } = filterSearchReturnByBuilderId(
    records,
    requestContext.builderId
  );

  records.resources = resources;
  records.bundle.entry = entry;
  records.bundle.total = entry.length;
  records.total = resources.length;

  return records;
}

// Like searchAllRecords, but filters out lens resources.
export async function searchCommonRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const params = mergeParams(searchParams, {
    "_tag:not": [...LENS_TAGS, ...SUMMARY_TAGS, ...UPI_TAGS],
  });
  return searchAllRecords(resourceType, requestContext, params);
}

// Returns a new filers object with every value that was an array,
// flattened into a single comma separated string.
// This way we can treat array values as ORs in FHIR requests.
// E.g. {status: ['active', 'relapse']} -> {status: "active, relapse"}.
export function flattenArrayFilters(filters: { [key: string]: unknown }) {
  return mapValues(filters, (value) =>
    Array.isArray(value) ? value.join(", ") : value
  );
}

// Merges two sets of params into a single set,
// taking special care to concat any arrays.
// E.g. mergeParams({_tag: [1], foo: "foo"}, {_tag: [2], bar: "bar"})
//   -> {_tag: [1, 2], foo: "foo", bar: "bar"}
function mergeParams(
  params: SearchParams | undefined,
  params2: SearchParams
): SearchParams {
  return mergeWith(params, params2, (v, v2) =>
    // Concat arrays otherwise return undefined to let mergeWith handle it.
    Array.isArray(v) ? v.concat(v2) : undefined
  );
}

// Returns the needed search params to filter resources down to those
// pertaining to our patientUPID.
function patientSearchParams(
  resourceType: ResourceTypeString,
  patientUPID?: string
): SearchParams {
  // No search param needed when not searching for a patientUPID.
  if (!patientUPID) {
    return {};
  }

  const identifier = `${SYSTEM_ZUS_UNIVERSAL_ID}|${patientUPID}`;

  switch (resourceType) {
    case "Coverage":
      return { "beneficiary.identifier": identifier };
    case "AllergyIntolerance":
    case "CareTeam":
    case "Condition":
    case "DocumentReference":
    case "Encounter":
    case "Immunization":
    case "MedicationAdministration":
    case "MedicationDispense":
    case "MedicationRequest":
    case "MedicationStatement":
      return { "patient.identifier": identifier };
    case "Patient":
      return { identifier };
    default:
      throw new Error(
        `Unhandled patient search for resource type: ${resourceType}`
      );
  }
}

export const filterSearchReturnByBuilderId = <T extends ResourceTypeString>(
  searchReturn: SearchReturn<T>,
  builderID: string
) => {
  const resources = filter(
    searchReturn.resources,
    (record) =>
      !!find(record.meta?.tag, {
        system: SYSTEM_ZUS_OWNER,
        code: `builder/${builderID}`,
      })
  );

  const entry = filter(
    searchReturn.bundle.entry,
    (record) =>
      !!find(record.resource?.meta?.tag, {
        system: SYSTEM_ZUS_OWNER,
        code: `builder/${builderID}`,
      })
  );

  return { resources, entry };
};
