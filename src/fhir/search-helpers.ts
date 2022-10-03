import Client, { SearchParams } from "fhir-kit-client";
import { find, mapValues } from "lodash";

import { getResources } from "./bundle";
import {
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_LENS,
  SYSTEM_ZUS_THIRD_PARTY,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "./system-urls";
import { ResourceType, ResourceTypeString } from "./types";

const MAX_COUNT = 250;

// Enumerating ALL of the third party tags.
const THIRD_PARTY_TAGS = [
  `${SYSTEM_ZUS_THIRD_PARTY}|surescripts`,
  `${SYSTEM_ZUS_THIRD_PARTY}|commonwell`,
  `${SYSTEM_ZUS_THIRD_PARTY}|elation`,
];

// Enumerating ALL of the lens tags.
const LENS_TAGS = [
  `${SYSTEM_ZUS_LENS}|ActiveMedications`,
  `${SYSTEM_ZUS_LENS}|ChronicConditions`,
];

const SUMMARY_TAGS = [`${SYSTEM_SUMMARY}|Common`];

export type SearchReturn<T extends ResourceTypeString> = {
  bundle: fhir4.Bundle;
  total: number;
  resources: ResourceType<T>[];
};

// Performs a FHIR search for the given resourceType accross all resources
// the user has access to. This can include lens and third party resources!
// Returns {bundle: fhir4.Bundle, total: number, resources: ResourceType[]}.
// Usage: {bundle, total, resources: tasks} =
//          searchAllRecords("Task", fhirClient, searchParams)
// NOTE: "patientUPID" is a special searchParam that will correctly
//       filter down to the resources pertaining to that patient UPID.
export async function searchAllRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const { patientUPID, _count, ...params } = searchParams ?? {};
  const fetchAll = typeof _count === "undefined";
  const count = fetchAll ? MAX_COUNT : _count;
  const bundle = (await fhirClient.search({
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

// Like searchAllRecords, but filters out lens & third party resources.
export async function searchBuilderRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const nonBuilderTags = [...THIRD_PARTY_TAGS, ...LENS_TAGS, SUMMARY_TAGS];

  return searchAllRecords(resourceType, fhirClient, {
    ...searchParams,
    "_tag:not": nonBuilderTags.join(","),
  });
}

// Like searchAllRecords, but filters down to only the lens.
export async function searchLensRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  return searchAllRecords(resourceType, fhirClient, {
    ...searchParams,
    _tag: SUMMARY_TAGS.join(","),
  });
}

// Like searchAllRecords, but filters out lens resources.
export async function searchCommonRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  return searchAllRecords(resourceType, fhirClient, {
    ...searchParams,
    "_tag:not": [...LENS_TAGS, ...SUMMARY_TAGS].join(","),
  });
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
    case "Condition":
    case "Encounter":
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

export async function getUPIDfromPatientID(
  fhirClient: Client,
  patientID: string,
  systemURL: string
): Promise<string> {
  try {
    const bundle = (await fhirClient.search({
      resourceType: "Patient",
      searchParams: {
        identifier: `${systemURL}|${patientID}`,
      },
    })) as fhir4.Bundle;

    const patient = getResources(bundle, "Patient");

    const patientUPID = find(patient[0].identifier, {
      system: SYSTEM_ZUS_UNIVERSAL_ID,
    })?.value as string;

    return patientUPID;
  } catch (e) {
    throw new Error(
      `Failed fetching patient UPID information for patient from patientID ${patientID} with system ${systemURL}: ${e}`
    );
  }
}
