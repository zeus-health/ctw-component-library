import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedBasics, getMergedIncludedResources } from "@/fhir/bundle";
import {
  getActiveMedications,
  getBuilderMedications,
  MedicationResults,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import {
  QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
} from "@/utils/query-keys";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(): UseQueryResult<
  MedicationResults,
  unknown
> {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [
      {
        informationSourceNot: "Patient", // exclude medication statements where the patient is the information source
      },
    ],
    getBuilderMedications
  );
}

export function useQueryGetSummarizedPatientMedications(): UseQueryResult<
  MedicationResults,
  unknown
> {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    [
      {
        _revinclude: "Basic:subject",
      },
    ],
    getActiveMedications
  );
}

/**
 * This hook provides all patient medication statements reconciled into two
 * categories ("Builder Medications" and "Other Provider Medications"). This is
 * useful when creating content such as the <PatientMedications /> component.
 */
export function useQueryAllPatientMedications() {
  const [builderMedications, setBuilderMedications] =
    useState<MedicationStatementModel[]>();
  const [otherProviderMedications, setOtherProviderMedications] =
    useState<MedicationStatementModel[]>();
  const [
    dismissedOtherProviderMedications,
    setDismissedOtherProviderMedications,
  ] = useState<MedicationStatementModel[]>();

  const summarizedMedicationsQuery = useQueryGetSummarizedPatientMedications();
  const builderMedicationsQuery = useQueryGetPatientMedsForBuilder();

  useEffect(() => {
    if (
      summarizedMedicationsQuery.data?.bundle &&
      builderMedicationsQuery.data?.bundle
    ) {
      const { medications: summarizedMedications, bundle: summarizedBundle } =
        summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } =
        builderMedicationsQuery.data;

      const basicsMap = getIncludedBasics(summarizedBundle);
      // Get included resources from both bundles so that we can reference them for contained medications.
      const includedResources = getMergedIncludedResources([
        summarizedMedicationsQuery.data.bundle,
        builderMedicationsQuery.data.bundle,
      ]);

      // Split the summarized medications into those known to the builder, unknown and historical/dismissed.
      const splitData = splitMedications(
        summarizedMedications.map(
          (m) =>
            new MedicationStatementModel(
              m,
              includedResources,
              basicsMap.get(m.id ?? "")
            )
        ),
        allMedicationsForBuilder.map(
          (m) =>
            new MedicationStatementModel(
              m,
              includedResources,
              basicsMap.get(m.id ?? "")
            )
        )
      );

      setBuilderMedications(splitData.builderMedications);
      setOtherProviderMedications(splitData.otherProviderMedications);
      setDismissedOtherProviderMedications(
        splitData.dismissedOtherProviderMedications
      );
    }
  }, [summarizedMedicationsQuery.data, builderMedicationsQuery.data]);

  const isLoading =
    builderMedicationsQuery.isLoading || summarizedMedicationsQuery.isLoading;
  const isFetching =
    builderMedicationsQuery.isFetching || summarizedMedicationsQuery.isFetching;
  const isError =
    builderMedicationsQuery.isError || summarizedMedicationsQuery.isError;

  return {
    isFetching,
    isLoading,
    isError,
    builderMedications,
    otherProviderMedications,
    dismissedOtherProviderMedications,
  };
}
