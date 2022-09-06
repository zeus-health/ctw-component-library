import Client, { SearchParams } from "fhir-kit-client";
import { find } from "lodash";

import { getResources } from "./bundle";
import {
  SYSTEM_ZUS_LENS,
  SYSTEM_ZUS_THIRD_PARTY,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "./system-urls";
import { ResourceType, ResourceTypeString } from "./types";

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

export type SearchReturn<T extends ResourceTypeString> = {
  bundle: fhir4.Bundle;
  total: number;
  resources: ResourceType<T>[];
};

// Returns the needed search params to filter resources down to those
// pertaining to our patientID and system url.
function patientSearchParams(
  resourceType: ResourceTypeString,
  patientID: string,
  systemURL: string
): SearchParams {
  // No search param needed when not searching for a patientID.

  const identifier = `${systemURL}|${patientID}`;

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

// Performs a FHIR search for the given resourceType accross all resources
// the user has access to. This can include lens and third party resources!
// Returns {bundle: fhir4.Bundle, total: number, resources: ResourceType[]}.
// Usage: {bundle, total, resources: tasks} =
//          searchAllRecords("Task", fhirClient, searchParams)
// NOTE: "patientID" is a special searchParam that will correctly
//       filter down to the resources pertaining to that patient ID.
export async function searchAllRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const { patientID, systemURL, ...params } = searchParams ?? {};
  const bundle = (await fhirClient.search({
    resourceType,
    searchParams: {
      ...params,
      ...patientSearchParams(
        resourceType,
        patientID as string,
        systemURL as string
      ),
    },
  })) as fhir4.Bundle;

  const resources = getResources(bundle, resourceType);
  return { bundle, total: bundle.total ?? 0, resources };
}

// Like searchAllRecords, but filters out lens resources.
export async function searchCommonRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  return searchAllRecords(resourceType, fhirClient, {
    ...searchParams,
    "_tag:not": LENS_TAGS.join(","),
  });
}

// Like searchAllRecords, but filters out lens & third party resources.
export async function searchBuilderRecords<T extends ResourceTypeString>(
  resourceType: T,
  fhirClient: Client,
  searchParams?: SearchParams
): Promise<SearchReturn<T>> {
  const nonBuilderTags = [...THIRD_PARTY_TAGS, ...LENS_TAGS];

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
    _tag: LENS_TAGS.join(","),
  });
}

export async function getUPIDfromPatientID(
  fhirClient: Client,
  patientID: string,
  systemURL: string,
  patientFilters?: SearchParams
): Promise<{ patientUPID: string }> {
  try {
    const { resources: patient } = await searchBuilderRecords(
      "Patient",
      fhirClient,
      {
        patientID,
        systemURL,
        ...patientFilters,
      }
    );

    const patientUPID = find(patient[0].identifier, {
      system: SYSTEM_ZUS_UNIVERSAL_ID,
    })?.value as string;

    return { patientUPID };
  } catch (e) {
    throw new Error(
      `Failed fetching patient UPID information for patient from patientID ${patientID} with system ${systemURL}: ${e}`
    );
  }
}
