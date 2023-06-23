import Client, { SearchParams } from "fhir-kit-client";
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
import { getLensBuilderId } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { filter, mapValues, mergeWith, some } from "@/utils/nodash";

const MAX_COUNT = 250;

// Set env to true to fetch all pages from ODS.
const DEBUG_ODS_FETCH_ALL_PAGES = import.meta.env.VITE_DEBUG_ODS_FETCH_ALL_PAGES;

// Number of entries in bundle before we stop fetching all pages.
// This way, we don't accidentally fetch 100K resources from ODS.
const DEBUG_ODS_FETCH_ALL_PAGES_CUTOFF = 2500;

// TODO: move this into client.ts after we are off ODS.
export function excludeTagsinPatientRecordSearch<T extends ResourceTypeString>(
  resourceType: T
): string[] {
  switch (resourceType) {
    case "Patient":
      return [...UPI_TAGS];
    case "Condition":
      return [...CONDITIONS_LENS_TAGS, ...SUMMARY_TAGS];
    case "MedicationStatement":
      return [...MEDICATION_LENS_TAGS, ...SUMMARY_TAGS];
    case "Coverage":
    case "AllergyIntolerance":
    case "CareTeam":
    case "DocumentReference":
    case "Encounter":
    case "Immunization":
    case "MedicationAdministration":
    case "MedicationDispense":
    case "MedicationRequest":
    default:
      return [];
  }
}

// Enumerating ALL of the third party tags.
const THIRD_PARTY_TAGS = [
  `${SYSTEM_ZUS_THIRD_PARTY}|surescripts`,
  `${SYSTEM_ZUS_THIRD_PARTY}|commonwell`,
  `${SYSTEM_ZUS_THIRD_PARTY}|elation`,
  `${SYSTEM_ZUS_THIRD_PARTY}|collective-medical`,
  `${SYSTEM_ZUS_THIRD_PARTY}|quest`,
];

// Enumerating Medication-specific lens tags.
const MEDICATION_LENS_TAGS = [`${SYSTEM_ZUS_LENS}|ActiveMedications`];

// Enumerating Condition-specific lens tags.
const CONDITIONS_LENS_TAGS = [`${SYSTEM_ZUS_LENS}|ChronicConditions`];

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
  let bundle = (await requestContext.fhirClient.search({
    resourceType,
    searchParams: {
      ...params,
      _count: count,
      ...patientSearchParams(resourceType, patientUPID as string),
    },
  })) as fhir4.Bundle;

  if (DEBUG_ODS_FETCH_ALL_PAGES === "true") {
    bundle = await fetchAllPages(requestContext.fhirClient, bundle);
  }

  const resources = getResources(bundle, resourceType);
  return { bundle, total: bundle.total ?? 0, resources };
}

// Like searchAllRecords, but only for resources from this builder.
export async function searchBuilderRecords<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  // TODO: Once all third party and lens data is being written to dedicated builders (ie. we are in a "post-kludge world")
  // then we can remove all of this filtering by firstparty and the user's builder.
  // The whole purpose of this code is to specifically target data that was written by the user's builder.
  const nonBuilderTags = [
    ...THIRD_PARTY_TAGS,
    ...MEDICATION_LENS_TAGS,
    ...CONDITIONS_LENS_TAGS,
    ...SUMMARY_TAGS,
    ...UPI_TAGS,
  ];
  type FirstPartyParams = {
    firstparty?: boolean;
    "_tag:not"?: string[];
  };
  const firstPartyParams: FirstPartyParams = {};

  // Only some resources in ODS support filtering by the "firstparty" in order to exclude 3rd party and lens data.
  // For other resources we'll need to keep using the _tag:not parameter which is significantly slower.
  if (FIRST_PARTY_TAG_SUPPORTED_RESOURCES.includes(resourceType)) {
    firstPartyParams.firstparty = true;
  } else {
    firstPartyParams["_tag:not"] = nonBuilderTags;
  }

  const params = mergeParams(searchParams, firstPartyParams);
  const records = await searchAllRecords(resourceType, requestContext, params);

  // Filter using the user's builder ID.
  const { entry, resources } = filterSearchReturnByBuilderId(
    records,
    requestContext.contextBuilderId || requestContext.builderId
  );

  records.resources = resources;
  records.bundle.entry = entry;

  return records;
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
  const builderId = requestContext.contextBuilderId || requestContext.builderId;
  const records = await searchAllRecords(resourceType, requestContext, params);
  // Filter using the lens builderId for data from the builder that exists in the post-kludge world.
  let { entry, resources } = filterSearchReturnByBuilderId(
    records,
    getLensBuilderId(requestContext.env),
    builderId
  );

  /* Filter using the user's builderId for data from the builder that exists in the pre-kludge world.
  This will help avoid getting duplicate results or no there is no data for the builder. 
  Once we have been in the post-kludge world long enough we can remove this functionality. */
  if (resources.length === 0 && entry.length === 0) {
    ({ entry, resources } = filterSearchReturnByBuilderId(records, builderId));
  }

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
  const builderId = requestContext.contextBuilderId || requestContext.builderId;
  const records = await searchAllRecords(resourceType, requestContext, params);

  // Filter using the lens builderId for data from the builder that exists in the post-kludge world.
  let { entry, resources } = filterSearchReturnByBuilderId(
    records,
    getLensBuilderId(requestContext.env),
    builderId
  );

  /* Filter using the user's builderId for data from the builder that exists in the pre-kludge world.
  This will help avoid getting duplicate results or know there is no data for the builder. 
  Once we have been in the post-kludge world long enough we can remove this functionality. */
  if (resources.length === 0 || entry.length === 0) {
    ({ entry, resources } = filterSearchReturnByBuilderId(records, builderId));
  }

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
  const params = searchParams || {};

  const results = await searchAllRecords(resourceType, requestContext, params);

  // filter out anything we don't want
  const filteredResources = results.resources.filter((resource) => {
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

  return { ...results, resources: filteredResources };
}

// Returns a new filers object with every value that was an array,
// flattened into a single comma separated string.
// This way we can treat array values as ORs in FHIR requests.
// E.g. {status: ['active', 'relapse']} -> {status: "active, relapse"}.
export function flattenArrayFilters(filters: { [key: string]: unknown }) {
  return mapValues(filters, (value) => (Array.isArray(value) ? value.join(", ") : value));
}

// Merges two sets of params into a single set,
// taking special care to concat any arrays.
// E.g. mergeParams({_tag: [1], foo: "foo"}, {_tag: [2], bar: "bar"})
//   -> {_tag: [1, 2], foo: "foo", bar: "bar"}
function mergeParams(params: SearchParams | undefined, params2: SearchParams): SearchParams {
  return mergeWith(params, params2, (v, v2) =>
    // Concat arrays otherwise return undefined to let mergeWith handle it.
    Array.isArray(v) ? v.concat(v2) : undefined
  );
}

// Returns the needed search params to filter resources down to those
// pertaining to our patientUPID.
function patientSearchParams(resourceType: ResourceTypeString, patientUPID?: string): SearchParams {
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
    case "DiagnosticReport":
    case "Encounter":
    case "Immunization":
    case "MedicationAdministration":
    case "MedicationDispense":
    case "MedicationRequest":
    case "MedicationStatement":
    case "Observation":
      return { "patient.identifier": identifier };
    case "Patient":
      return { identifier };
    default:
      throw new Error(`Unhandled patient search for resource type: ${resourceType}`);
  }
}

// Filters resources down to those owned by matchOwnerBuilderId.
// Filters the bundle of entries down to those owned by:
//  * mathOwnerBuilderId for search entries with mode "match"
//  * includedOwnerBuilderId for search entries with mode "include"
const filterSearchReturnByBuilderId = <T extends ResourceTypeString>(
  searchReturn: SearchReturn<T>,
  matchOwnerBuilderId: string,
  includedOwnerBuilderId?: string
) => {
  const resources = filter(searchReturn.resources, (record) =>
    some(record.meta?.tag, {
      system: SYSTEM_ZUS_OWNER,
      code: `builder/${matchOwnerBuilderId}`,
    })
  );

  const entry = filter(searchReturn.bundle.entry, (record) => {
    if (record.search?.mode === "include") {
      return some(record.resource?.meta?.tag, {
        system: SYSTEM_ZUS_OWNER,
        code: `builder/${includedOwnerBuilderId ?? matchOwnerBuilderId}`,
      });
    }
    return some(record.resource?.meta?.tag, {
      system: SYSTEM_ZUS_OWNER,
      code: `builder/${matchOwnerBuilderId}`,
    });
  });

  return { resources, entry };
};

async function fetchAllPages(fhirClient: Client, bundle: fhir4.Bundle) {
  const entries = [...(bundle.entry ?? [])];
  let currentBundle = bundle;

  while (
    currentBundle.link?.find((link) => link.relation === "next")?.url &&
    entries.length < DEBUG_ODS_FETCH_ALL_PAGES_CUTOFF
  ) {
    // eslint-disable-next-line no-await-in-loop
    currentBundle = (await fhirClient.nextPage({ bundle: currentBundle })) as fhir4.Bundle;
    entries.push(...(currentBundle.entry ?? []));
  }

  return { ...bundle, link: undefined, entry: entries, total: entries.length };
}
