import { getIncludedResources } from "./bundle";
import { CodePreference } from "./codeable-concept";
import { searchCommonRecords, searchCommonRecordsViaFQS } from "./search-helpers";
import { SYSTEM_NDC, SYSTEM_RXNORM, SYSTEM_SNOMED } from "./system-urls";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
import { AllergyListForPatientQuery } from "@/components/content/allergies/helpers/graphql";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

export type AllergyIntolerance = {
  AllergyIntoleranceList: fhir4.AllergyIntolerance[];
};

export function usePatientAllergiesViaFQS() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {

        // FIXME: not filtering out included resources
        // FIXME: not including iterate, patient:organization, etc
        const data = await searchCommonRecordsViaFQS<AllergyIntolerance>( requestContext, AllergyListForPatientQuery)
        return data.map((x) => ({
          resource: x,
        }) );

      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }, "req.patient_allergies")
  )
}

export function usePatientAllergies() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const { bundle, resources: allergy } = await searchCommonRecords(
          "AllergyIntolerance",
          requestContext,
          {
            patientUPID: patient.UPID,
            _include: ["AllergyIntolerance:patient"],
            "_include:iterate": "Patient:organization",
          }
        );

        const includedResources = getIncludedResources(bundle);

        return applyAllergyFilters(allergy, includedResources);
      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }, "req.patient_allergies")
  );
}

export const ALLERGY_CODE_PREFERENCE_ORDER: CodePreference[] = [
  { system: SYSTEM_RXNORM },
  { system: SYSTEM_NDC },
  { system: SYSTEM_SNOMED },
];
