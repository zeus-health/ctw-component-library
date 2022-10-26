import { compact } from "lodash/fp";
import { UseQueryResult } from "@tanstack/react-query";
import {
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";
import { useQueryWithPatient } from "@/components/core/patient-provider";
import {
  getBuilderMedications,
  getPatientLensMedications,
} from "@/fhir/medications";
import type { MedicationBuilder } from "@/fhir/medications";

export function useQueryPatientBuilderMeds(
  statusParam = ""
): UseQueryResult<MedicationBuilder, unknown> {
  const queryKey = compact(["patient-medications", statusParam || null]).join(
    "-"
  );
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [
      {
        informationSource: "Patient",
        ...(statusParam === "active" && { status: "active" }),
      },
    ],
    getBuilderMedications
  );
}

export function useQueryPatientLensMeds(): UseQueryResult<
  MedicationBuilder,
  unknown
> {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATIONS,
    [],
    getPatientLensMedications
  );
}
