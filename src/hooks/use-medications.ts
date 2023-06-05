import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
export function useQueryGetPatientMedsForBuilder(
  enableFQS: boolean
): UseQueryResult<MedicationResults, unknown> {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
    [
      {
        informationSourceNot: "Patient", // exclude medication statements where the patient is the information source
      },
    ],
    enableFQS
      ? withTimerMetric(getBuilderMedicationStatementsFQS, "req.timing.builder_medications", [
          "fqs",
        ])
      : withTimerMetric(getBuilderMedications, "req.timing.builder_medications")
  );
}

export function useQueryGetSummarizedPatientMedications(
  enableFQS: boolean
): UseQueryResult<MedicationResults, unknown> {
  const basics = useBasic(enableFQS);
  const result = useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
    [
      {
        _revinclude: "Basic:subject",
      },
    ],
    enableFQS
      ? withTimerMetric(getActiveMedicationsFQS, "req.timing.active_medications", ["fqs"])
      : withTimerMetric(getActiveMedications, "req.timing.active_medications")
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
export function useQueryAllPatientMedications(enableFQS: boolean) {
  const [builderMedications, setBuilderMedications] = useState<MedicationStatementModel[]>([]);
  const [otherProviderMedications, setOtherProviderMedications] = useState<
    MedicationStatementModel[]
  >([]);

  const summarizedMedicationsQuery = useQueryGetSummarizedPatientMedications(enableFQS);
  const builderMedicationsQuery = useQueryGetPatientMedsForBuilder(enableFQS);

  useEffect(() => {
    if (
      !enableFQS &&
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
      enableFQS &&
      summarizedMedicationsQuery.data?.medications &&
      builderMedicationsQuery.data?.bundle // TODO: switch to not use bundle
    ) {
      const { medications: summarizedMedications, basic: basics } = summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } = builderMedicationsQuery.data;

      // TODO: deal with basics and included resources
      const basicsMap = getIncludedBasicsMap(basics);
      // Get included resources from both bundles so that we can reference them for contained medications.
      const includedResources = {} as ResourceMap;

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
    }
  }, [summarizedMedicationsQuery.data, builderMedicationsQuery.data, enableFQS]);

  const isLoading = builderMedicationsQuery.isLoading || summarizedMedicationsQuery.isLoading;
  const isFetching = builderMedicationsQuery.isFetching || summarizedMedicationsQuery.isFetching;
  const isError = builderMedicationsQuery.isError || summarizedMedicationsQuery.isError;

  return {
    isFetching,
    isLoading,
    isError,
    builderMedications,
    otherProviderMedications,
  };
}
