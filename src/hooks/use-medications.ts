import { compact } from "lodash/fp";
import { useState, useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
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
import { getMergedIncludedResources } from "@/fhir/bundle";
import { createPatientStatusMap, getRxNormCode } from "@/fhir/medication";
import { MedicationStatementModel } from "@/models/medication-statement";

// Gets patient medications for the builder, excluding meds where the information source is patient.
export function useQueryGetPatientMedsForBuilder(
  statusParam = ""
): UseQueryResult<MedicationBuilder, unknown> {
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

export function useQueryAllPatientMedicationsByStatus(statusParam = "all") {
  const [builderMedications, setBuilderMedications] =
    useState<MedicationStatementModel[]>();
  const [otherProviderMedications, setOtherProviderMedications] =
    useState<MedicationStatementModel[]>();

  const medicationsForBuilderByStatusQuery =
    useQueryGetPatientMedsForBuilder(statusParam);
  const summarizedMedicationsQuery = useQueryGetSummarizedPatientMedications();
  const allMedicationsForBuilderQuery = useQueryGetPatientMedsForBuilder();

  useEffect(() => {
    if (
      summarizedMedicationsQuery.data?.bundle &&
      allMedicationsForBuilderQuery.data?.bundle
    ) {
      const showAll = statusParam === "all";
      let { medications: summarizedMedications } =
        summarizedMedicationsQuery.data;
      const { medications: allMedicationsForBuilder } =
        allMedicationsForBuilderQuery.data;
      const medicationsForBuilderByStatus = allMedicationsForBuilder.filter(
        (med) => showAll || med.status === statusParam
      );

      const includedResources = getMergedIncludedResources([
        summarizedMedicationsQuery.data.bundle,
        allMedicationsForBuilderQuery.data.bundle,
      ]);

      const builderPatientRxNormStatusMap = createPatientStatusMap(
        allMedicationsForBuilder,
        includedResources
      );

      const builderActiveRxNorms = compact(
        medicationsForBuilderByStatus
          .filter((m) => m.status === "active") // Track ONLY active builder meds.
          .map((medication) => getRxNormCode(medication, includedResources))
      );

      const lensActiveRxNorms = compact(
        summarizedMedications.map((medication) =>
          getRxNormCode(medication, includedResources)
        )
      );

      // Filter out any active medications that the builder already knows about.
      summarizedMedications = summarizedMedications.filter(
        (medication) =>
          !builderActiveRxNorms.includes(
            getRxNormCode(medication, includedResources) ?? ""
          )
      );

      const toModel = (medication: fhir4.MedicationStatement) =>
        new MedicationStatementModel(
          medication,
          includedResources,
          lensActiveRxNorms,
          builderPatientRxNormStatusMap
        );

      setBuilderMedications(medicationsForBuilderByStatus.map(toModel));
      setOtherProviderMedications(summarizedMedications.map(toModel));
    }
  }, [
    medicationsForBuilderByStatusQuery.data,
    summarizedMedicationsQuery.data,
    allMedicationsForBuilderQuery.data,
    statusParam,
  ]);

  return {
    builderMedications,
    otherProviderMedications,
  };
}
