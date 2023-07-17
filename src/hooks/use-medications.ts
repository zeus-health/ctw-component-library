import { useEffect, useState } from "react";
import { useFQSFeatureToggle } from "./use-feature-toggle";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useBasic } from "@/fhir/basic";
import {
  getBuilderMedicationsFQS,
  getBuilderMedicationsODS,
  getSummaryMedicationsFQS,
  getSummaryMedicationsODS,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import {
  QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
} from "@/utils/query-keys";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function usePatientBuilderMedications() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [],
    "medications",
    "req.timing.builder_medications",
    getBuilderMedicationsFQS,
    getBuilderMedicationsODS
  );
}

export function usePatientSummaryMedications() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    [],
    "medications",
    "req.timing.summary_medications",
    getSummaryMedicationsFQS,
    getSummaryMedicationsODS
  );
}

/**
 * This hook provides all patient medication statements reconciled into two
 * categories ("Builder Medications" and "Other Provider Medications"). This is
 * useful when creating content such as the <PatientMedications /> component.
 */
export function useQueryAllPatientMedications() {
  const fqs = useFQSFeatureToggle("medications");
  const [expandedBuilderMedications, setExpandedBuilderMedications] = useState<
    MedicationStatementModel[]
  >([]);
  const [otherProviderMedications, setOtherProviderMedications] = useState<
    MedicationStatementModel[]
  >([]);
  const [allMedications, setAllMedications] = useState<MedicationStatementModel[]>([]);

  const summaryMedicationsQuery = usePatientSummaryMedications();
  const builderMedicationsQuery = usePatientBuilderMedications();

  // This query is a noop when FQS is disabled and will just return an empty list of basic resources.
  const basicQuery = useBasic(fqs);

  useEffect(() => {
    const builderMedications = builderMedicationsQuery.data ?? [];
    const summaryMedications = summaryMedicationsQuery.data ?? [];
    const basics = basicQuery.data ?? [];

    // Split the summarized medications into those known/unknown to the builder
    const splitData = splitMedications(summaryMedications, builderMedications);

    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      splitData.otherProviderMedications.forEach((m, i) => {
        const filteredBasics = basics.filter(
          (b) => b.subject?.reference === `${m.resourceType}/${m.id}`
        );
        splitData.otherProviderMedications[i].revIncludes = filteredBasics;
      });
    }
    setExpandedBuilderMedications(splitData.builderMedications);
    setOtherProviderMedications(splitData.otherProviderMedications);
    setAllMedications([...splitData.builderMedications, ...splitData.otherProviderMedications]);
  }, [builderMedicationsQuery.data, summaryMedicationsQuery.data, basicQuery.data]);

  const isLoading =
    builderMedicationsQuery.isLoading || summaryMedicationsQuery.isLoading || basicQuery.isLoading;
  const isError =
    builderMedicationsQuery.isError || summaryMedicationsQuery.isError || basicQuery.isError;
  const isFetching =
    builderMedicationsQuery.isFetching ||
    summaryMedicationsQuery.isFetching ||
    basicQuery.isFetching ||
    !fqs.ready;

  return {
    isLoading,
    isError,
    isFetching,
    builderMedications: expandedBuilderMedications,
    otherProviderMedications,
    allMedications,
  };
}
