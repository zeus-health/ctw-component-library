import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { AllergyModel } from "@/fhir/models/allergies";
import { searchCommonRecords } from "@/fhir/search-helpers";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export function usePatientAllergies() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources } = await searchCommonRecords(
          "AllergyIntolerance",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return resources.map((allergy) => new AllergyModel(allergy));
      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }
  );
}
