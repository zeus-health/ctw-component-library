import { useEffect, useState } from "react";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import {
  getBuilderMedicationsFQS,
  getSummaryMedicationsFQS,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import {
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_SUMMARY_MEDICATIONS,
} from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function usePatientBuilderMedications(enabled = true) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [],
    withTimerMetric(getBuilderMedicationsFQS, "req.timing.builder_medications"),
    enabled
  );
}

export function usePatientSummaryMedications(enabled = true) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_SUMMARY_MEDICATIONS,
    [],
    withTimerMetric(getSummaryMedicationsFQS, "req.timing.summary_medications"),
    enabled
  );
}

/**
 * This hook provides all patient medication statements reconciled into two
 * categories ("Builder Medications" and "Other Provider Medications"). This is
 * useful when creating content such as the <PatientMedications /> component.
 */
export function useQueryAllPatientMedications(enabled = true) {
  const [expandedBuilderMedications, setExpandedBuilderMedications] = useState<
    MedicationStatementModel[]
  >([]);
  const [otherProviderMedications, setOtherProviderMedications] = useState<
    MedicationStatementModel[]
  >([]);
  const [allMedications, setAllMedications] = useState<MedicationStatementModel[]>([]);

  const summaryMedicationsQuery = usePatientSummaryMedications(enabled);
  const builderMedicationsQuery = usePatientBuilderMedications(enabled);

  useEffect(() => {
    const builderMedications = builderMedicationsQuery.data ?? [];
    const summaryMedications = summaryMedicationsQuery.data ?? [];

    // Split the summarized medications into those known/unknown to the builder
    const splitData = splitMedications(summaryMedications, builderMedications);
    setExpandedBuilderMedications(splitData.builderMedications);
    setOtherProviderMedications(splitData.otherProviderMedications);
    setAllMedications([...splitData.builderMedications, ...splitData.otherProviderMedications]);
  }, [builderMedicationsQuery.data, summaryMedicationsQuery.data]);

  const isLoading = builderMedicationsQuery.isLoading || summaryMedicationsQuery.isLoading;
  const isError = builderMedicationsQuery.isError || summaryMedicationsQuery.isError;
  const isFetching = builderMedicationsQuery.isFetching || summaryMedicationsQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    builderMedications: expandedBuilderMedications,
    otherProviderMedications,
    allMedications,
  };
}
