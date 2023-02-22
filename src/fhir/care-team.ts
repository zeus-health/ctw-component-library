import { searchCommonRecords } from "./search-helpers";
import { applyCareTeamFilters } from "@/components/care-team/patient-careteam-filters";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";

export function usePatientCareTeam() {
  return useQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: careteam } = await searchCommonRecords(
          "CareTeam",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return orderBy(applyCareTeamFilters(careteam), ["desc"]);
      } catch (e) {
        throw new Error(
          `Failed fetching care team information for patient: ${e}`
        );
      }
    }
  );
}
