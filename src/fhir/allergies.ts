import { createGraphClient } from "./fqs";
import { getAllergiesQuery } from "./queries/allergies";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export function usePatientAllergies() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    async (requestContext, patient) => {
      try {
        const graphClient = createGraphClient(requestContext);
        const data = await graphClient.request(getAllergiesQuery(patient.UPID));

        return orderBy(
          applyAllergyFilters(data.AllergyIntoleranceList),
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
