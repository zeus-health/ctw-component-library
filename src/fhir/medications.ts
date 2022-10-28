import { CTWRequestContext } from "@/components/core/ctw-context";
import { MedicationModel } from "@/models/medication";
import { PatientModel } from "@/models/patients";
import { errorResponse } from "@/utils/errors";
import { sort } from "@/utils/sort";
import type { FhirResource, MedicationStatement } from "fhir/r4";
import { omit } from "lodash/fp";
import { bundleToResourceMap, getMergedIncludedResources } from "./bundle";
import { getRxNormCode } from "./medication";
import {
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
  SearchReturn,
} from "./search-helpers";
import { ResourceTypeString } from "./types";

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
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys: object[] = []
): Promise<MedicationBuilder> {
  const [searchFilters = {}] = keys;

  try {
    const response = await searchBuilderRecords(
      "MedicationStatement",
      requestContext,
      {
        patientUPID: patient.UPID as string,
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
  requestContext: CTWRequestContext,
  patient: PatientModel,
  keys = []
): Promise<MedicationBuilder> {
  const [searchFilters = {}] = keys;

  try {
    const response = await searchLensRecords(
      "MedicationStatement",
      requestContext,
      {
        patientUPID: patient.UPID as string,
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

// Helper function to filter out medications missing RxNorm codes.
export function filterMedicationsWithNoRxNorms(
  medications: MedicationStatement[],
  bundle: FhirResource
) {
  const resourceMap = bundleToResourceMap(bundle);
  return medications.filter((m) => getRxNormCode(m, resourceMap) !== undefined);
}

export async function useMedicationHistory(
  rxNorm: string,
  patientUPID: string,
  requestContext: CTWRequestContext
) {
  const [
    medicationStatementResponse,
    medicationAdministrationResponse,
    medicationRequestResponse,
    medicationDispenseResponse,
  ] = await Promise.all([
    searchWrapper("MedicationStatement", requestContext, patientUPID),
    searchWrapper("MedicationAdministration", requestContext, patientUPID),
    searchWrapper("MedicationRequest", requestContext, patientUPID),
    searchWrapper("MedicationDispense", requestContext, patientUPID),
  ]);

  let medications = [
    ...medicationStatementResponse.resources,
    ...medicationAdministrationResponse.resources,
    ...medicationRequestResponse.resources,
    ...medicationDispenseResponse.resources,
  ];

  const includedResources = getMergedIncludedResources([
    medicationStatementResponse.bundle,
    medicationAdministrationResponse.bundle,
    medicationRequestResponse.bundle,
    medicationDispenseResponse.bundle,
  ]);

  medications = medications.filter(
    (medication) => getRxNormCode(medication, includedResources) === rxNorm
  );

  medications = sort(
    medications,
    (medication) => new MedicationModel(medication).date ?? "",
    "desc",
    true
  );

  return { medications, includedResources };
}

function searchWrapper<T extends ResourceTypeString>(
  resourceType: T,
  requestContext: CTWRequestContext,
  patientUPID: string
): Promise<SearchReturn<T>> {
  return searchCommonRecords(resourceType, requestContext, {
    patientUPID,
    _include: [`${resourceType}:patient`, `${resourceType}:medication`],
    "_include:iterate": "Patient:organization",
  });
}
