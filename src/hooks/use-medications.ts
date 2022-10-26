import { useQueryWithPatient } from "@/components/core/patient-provider";
import type { MedicationBuilder } from "@/fhir/medications";
import {
  getBuilderMedications,
  getPatientLensMedications,
} from "@/fhir/medications";
import {
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { UseQueryResult } from "@tanstack/react-query";
import { compact } from "lodash/fp";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(
  statusParam = ""
): UseQueryResult<MedicationBuilder, unknown> {
  const queryKey = compact(["patient-medications", statusParam || null]).join(
    "-"
  );
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [
      {
        informationSourceNot: "Patient", // exclude medication statements where the patient is the information source
        ...(statusParam === "active" && { status: "active" }),
      },
    ],
    getBuilderMedications
  );
}

export function useQueryGetSummarizedPatientMedications(): UseQueryResult<
  MedicationBuilder,
  unknown
> {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATIONS,
    [],
    getPatientLensMedications
  );
}
