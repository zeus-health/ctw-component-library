import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getMergedIncludedResources } from "@/fhir/bundle";
import {
  getActiveMedications,
  getBuilderMedications,
  MedicationBuilder,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import {
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATIONS,
} from "@/utils/query-keys";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(): UseQueryResult<
  MedicationBuilder,
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
  MedicationBuilder,
  unknown
> {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATIONS,
    [],
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

  const summarizedMedicationsQuery = useQueryGetSummarizedPatientMedications();
  const builderMedicationsQuery = useQueryGetPatientMedsForBuilder();

  useEffect(() => {
    if (
      summarizedMedicationsQuery.data?.bundle &&
      builderMedicationsQuery.data?.bundle
    ) {
      const { medications: summarizedMedications } =
        summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } =
        builderMedicationsQuery.data;

      // Get included resources from both bundles so that we can reference them for contained medications.
      const includedResources = getMergedIncludedResources([
        summarizedMedicationsQuery.data.bundle,
        builderMedicationsQuery.data.bundle,
      ]);

      // Split the summarized medications into those known to the builder and those that are new.
      const splitData = splitMedications(
        summarizedMedications,
        allMedicationsForBuilder,
        includedResources
      );

      setBuilderMedications(
        splitData.builderMedications.map(
          (m) => new MedicationStatementModel(m, includedResources)
        )
      );
      setOtherProviderMedications(
        splitData.otherProviderMedications.map(
          (m) => new MedicationStatementModel(m, includedResources)
        )
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
  };
}
