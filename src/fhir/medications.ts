import type { FhirResource, MedicationStatement } from "fhir/r4";
import { omit } from "lodash/fp";
import { errorResponse } from "@/utils/errors";
import { bundleToResourceMap } from "./bundle";
import { getRxNormCode } from "./medication";
import {
  searchBuilderRecords,
  searchLensRecords,
  SearchReturn,
} from "./search-helpers";
import { QueryFunctionContext } from "@tanstack/react-query";
import { getFhirClientFromQuery } from "@/fhir/utils";

export type InformationSource =
  | "Patient"
  | "Practitioner"
  | "PractitionerRole"
  | "RelatedPerson"
  | "Organization";

type MedicationFilter = {
  status?: fhir4.MedicationStatement["status"];
  informationSource?: InformationSource;
  informationSourceNot?: InformationSource;
};

type PatientUPID = string;
type QueryKeyMedicationFilter = [
  string,
  PatientUPID | undefined,
  MedicationFilter | undefined
];

export type MedicationBuilder = {
  bundle: fhir4.Bundle;
  medications: fhir4.MedicationStatement[];
};

const omitClientFilters = omit(["informationSourceNot", "informationSource"]);

function applySearchFiltersToResponse(
  response: SearchReturn<"MedicationStatement">,
  searchFilters: MedicationFilter = {}
) {
  let medications = filterMedicationsWithNoRxNorms(
    response.resources,
    response.bundle
  );

  if (searchFilters.informationSource) {
    medications = medications.filter(
      (medication) =>
        medication.informationSource?.type === searchFilters.informationSource
    );
  }

  if (searchFilters.informationSourceNot) {
    medications = medications.filter(
      (medication) =>
        medication.informationSource?.type !==
        searchFilters.informationSourceNot
    );
  }

  return medications;
}

/* Note when filtering the bundle may contain data that will no longer be in the returned medications. */
export async function getBuilderMedications(
  queryParams: QueryFunctionContext<QueryKeyMedicationFilter>
): Promise<MedicationBuilder> {
  const { meta, queryKey } = queryParams;

  const fhirClient = getFhirClientFromQuery(meta);
  const [_, patientUPID = "", searchFilters = {}] = queryKey;

  try {
    const response = await searchBuilderRecords(
      "MedicationStatement",
      fhirClient,
      {
        patientUPID,
        _include: "MedicationStatement:medication",
        ...omitClientFilters(searchFilters),
      }
    );

    const medications = applySearchFiltersToResponse(response, searchFilters);

    return { bundle: response.bundle, medications };
  } catch (e) {
    throw errorResponse("Failed fetching medications for patient", e);
  }
}

/* Note when filtering the bundle may contain data that will no longer be in the returned medications. */
export async function getPatientLensMedications(
  queryParams: QueryFunctionContext<QueryKeyMedicationFilter>
): Promise<MedicationBuilder> {
  const { meta, queryKey } = queryParams;

  const fhirClient = getFhirClientFromQuery(meta);
  const [_, patientUPID = "", searchFilters = {}] = queryKey;

  try {
    const response = await searchLensRecords(
      "MedicationStatement",
      fhirClient,
      {
        patientUPID,
        _include: "MedicationStatement:medication",
        ...omitClientFilters(searchFilters),
      }
    );

    const medications = applySearchFiltersToResponse(response, searchFilters);

    return { bundle: response.bundle, medications };
  } catch (e) {
    throw errorResponse("Failed fetching active medications for patient", e);
  }
}

// Helper function to filter out medications missing RxNorm codes.
export function filterMedicationsWithNoRxNorms(
  medications: MedicationStatement[],
  bundle: FhirResource
) {
  const resourceMap = bundleToResourceMap(bundle);
  return medications.filter((m) => getRxNormCode(m, resourceMap) !== undefined);
}
