import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { AllergyModel } from "@/fhir/models/allergies";
import { searchCommonRecords } from "@/fhir/search-helpers";
import { orderBy } from "@/utils/nodash";
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

        return orderBy(
          resources.map((allergy) => new AllergyModel(allergy)),
          [(allergy) => allergy.onset],
          ["desc"]
        );
      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }
  );
}
