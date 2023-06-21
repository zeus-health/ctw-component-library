import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFQSFeatureToggle } from "./use-fqs-feature-toggle";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useBasic } from "@/fhir/basic";
import { getIncludedBasics, getIncludedBasicsMap, getMergedIncludedResources } from "@/fhir/bundle";
import {
  getActiveMedications,
  getActiveMedicationsFQS,
  getBuilderMedications,
  getBuilderMedicationStatementsFQS,
  getCommonMedicationDispenses,
  getCommonMedicationRequests,
  getMedicationStatements,
  MedicationResults,
  splitMedications,
} from "@/fhir/medications";
import { MedicationStatementModel } from "@/fhir/models/medication-statement";
import { ResourceMap } from "@/fhir/types";
import {
  QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
  QUERY_KEY_PATIENT_MEDICATION_DISPENSE_COMMON,
  QUERY_KEY_PATIENT_MEDICATION_REQUESTS_COMMON,
  QUERY_KEY_PATIENT_MEDICATION_STATEMENT,
} from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(): UseQueryResult<MedicationResults, unknown> {
  const fqs = useFQSFeatureToggle("medications");
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [fqs.ready],
    (() => {
      if (!fqs.ready) {
        return async () =>
          ({
            medications: [] as fhir4.MedicationStatement[],
            basic: [] as fhir4.Basic[],
          } as MedicationResults);
      }
      return fqs.enabled
        ? withTimerMetric(getBuilderMedicationStatementsFQS, "req.timing.builder_medications", [
            "fqs",
          ])
        : withTimerMetric(getBuilderMedications, "req.timing.builder_medications");
    })()
  );
}

export function useQueryGetSummarizedPatientMedications(): UseQueryResult<
  MedicationResults,
  unknown
> {
  const fqs = useFQSFeatureToggle("medications");
  const basics = useBasic(fqs);
  const result = useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    [fqs.ready],
    (() => {
      if (!fqs.ready) {
        return async () =>
          ({
            medications: [] as fhir4.MedicationStatement[],
            basic: [] as fhir4.Basic[],
          } as MedicationResults);
      }
      return fqs.enabled
        ? withTimerMetric(getActiveMedicationsFQS, "req.timing.active_medications", ["fqs"])
        : withTimerMetric(getActiveMedications, "req.timing.active_medications");
    })()
  );
  if (result.data && basics.data) {
    result.data.basic = basics.data;
  }
  return result;
}

export function useQueryGetPatientMedRequestsCommon() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATION_REQUESTS_COMMON,
    [
      {
        informationSourceNot: "Patient",
      },
    ],
    withTimerMetric(getCommonMedicationRequests, "req.medication_requests_common")
  );
}

export function useQueryGetPatientMedDispenseCommon() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATION_DISPENSE_COMMON,
    [
      {
        informationSourceNot: "Patient",
      },
    ],
    withTimerMetric(getCommonMedicationDispenses, "req.medication_dispense_common")
  );
}

export function useQueryMedicationStatement(rxNorm: string | undefined) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATION_STATEMENT,
    [rxNorm],
    withTimerMetric(getMedicationStatements, "req.medication_statement")
  );
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
    fqs,
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
