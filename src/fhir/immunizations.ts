import { searchCommonRecords } from "./search-helpers";
import { applyImmunizationFilters } from "@/components/content/immunizations/patient-immunizations-filters";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";

export function usePatientImmunizations() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: immunizations } = await searchCommonRecords(
          "Immunization",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return orderBy(
          applyImmunizationFilters(immunizations),
          [(model) => model.occurance ?? ""],
          ["desc"]
        );
      } catch (e) {
        throw new Error(
          `Failed fetching immunization information for patient: ${e}`
        );
      }
    }
  );
}
