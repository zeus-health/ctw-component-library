import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFQSFeatureToggle } from "./use-fqs-feature-toggle";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useBasic } from "@/fhir/basic";
import { getIncludedBasics, getIncludedBasicsMap, getMergedIncludedResources } from "@/fhir/bundle";
import {
  getActiveMedications,
  getActiveMedicationsFQS,
  getBuilderMedications,
  getBuilderMedicationStatementsFQS,
  MedicationResults,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { ResourceMap } from "@/fhir/types";
import {
  QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
} from "@/utils/query-keys";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(): UseQueryResult<MedicationResults, unknown> {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [],
    "medications",
    "req.timing.builder_medications",
    getBuilderMedicationStatementsFQS,
    getBuilderMedications
  );
}

export function useQueryGetSummarizedPatientMedications(): UseQueryResult<
  MedicationResults,
  unknown
> {
  const fqs = useFQSFeatureToggle("medications");
  const basics = useBasic(fqs);
  const result = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    [],
    "medications",
    "req.timing.active_medications",
    getActiveMedicationsFQS,
    getActiveMedications
  );

  if (result.data && basics.data) {
    result.data.basic = basics.data;
  }
  return result;
}

/**
 * This hook provides all patient medication statements reconciled into two
 * categories ("Builder Medications" and "Other Provider Medications"). This is
 * useful when creating content such as the <PatientMedications /> component.
 */
export function useQueryAllPatientMedications() {
  const fqs = useFQSFeatureToggle("medications");
  const [builderMedications, setBuilderMedications] = useState<MedicationStatementModel[]>([]);
  const [otherProviderMedications, setOtherProviderMedications] = useState<
    MedicationStatementModel[]
  >([]);

  const summarizedMedicationsQuery = useQueryGetSummarizedPatientMedications();
  const builderMedicationsQuery = useQueryGetPatientMedsForBuilder();

  // refactor to use new hook!
  useEffect(() => {
    if (
      fqs.ready &&
      !fqs.enabled &&
      summarizedMedicationsQuery.data?.bundle &&
      builderMedicationsQuery.data?.bundle
    ) {
      const { medications: summarizedMedications, bundle: summarizedBundle } =
        summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } = builderMedicationsQuery.data;

      const basicsMap = getIncludedBasics(summarizedBundle);
      // Get included resources from both bundles so that we can reference them for contained medications.
      const includedResources = getMergedIncludedResources([
        summarizedMedicationsQuery.data.bundle,
        builderMedicationsQuery.data.bundle,
      ]);

      // Split the summarized medications into those known/unknown to the builder
      const splitData = splitMedications(
        summarizedMedications.map(
          (m) => new MedicationStatementModel(m, includedResources, basicsMap.get(m.id ?? ""))
        ),
        allMedicationsForBuilder.map(
          (m) => new MedicationStatementModel(m, includedResources, basicsMap.get(m.id ?? ""))
        )
      );

      setBuilderMedications(splitData.builderMedications);
      setOtherProviderMedications(splitData.otherProviderMedications);
    } else if (
      fqs.ready &&
      fqs.enabled &&
      summarizedMedicationsQuery.data?.medications &&
      builderMedicationsQuery.data?.medications
    ) {
      const { medications: summarizedMedications, basic: basics } = summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } = builderMedicationsQuery.data;

      const basicsMap = getIncludedBasicsMap(basics);

      // Split the summarized medications into those known/unknown to the builder
      const splitData = splitMedications(
        summarizedMedications.map(
          (m) => new MedicationStatementModel(m, {} as ResourceMap, basicsMap.get(m.id ?? ""))
        ),
        allMedicationsForBuilder.map(
          (m) => new MedicationStatementModel(m, {} as ResourceMap, basicsMap.get(m.id ?? ""))
        )
      );

      setBuilderMedications(splitData.builderMedications);
      setOtherProviderMedications(splitData.otherProviderMedications);
    }
  }, [
    summarizedMedicationsQuery.data,
    builderMedicationsQuery.data,
    summarizedMedicationsQuery.data?.basic,
    fqs.enabled,
    fqs.ready,
  ]);

  const isLoading = builderMedicationsQuery.isLoading || summarizedMedicationsQuery.isLoading;
  const isFetching =
    !fqs.ready || builderMedicationsQuery.isFetching || summarizedMedicationsQuery.isFetching;
  const isError = builderMedicationsQuery.isError || summarizedMedicationsQuery.isError;

  return {
    isFetching,
    isLoading,
    isError,
    builderMedications,
    otherProviderMedications,
  };
}
