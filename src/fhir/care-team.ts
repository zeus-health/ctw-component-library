import { getIncludedResources } from "./bundle";
import { searchCommonRecords } from "./search-helpers";
import { applyCareTeamFilters } from "@/components/content/care-team/patient-careteam-filters";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientCareTeam() {
  return useQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    withTimerMetric(
      async (requestContext, patient) => {
        try {
          const { bundle, resources } = await searchCommonRecords("CareTeam", requestContext, {
            patientUPID: patient.UPID,
            _include: "CareTeam:participant",
          });
          const includedResources = getIncludedResources(bundle);
          const results = applyCareTeamFilters(resources, includedResources);
          if (results.length === 0) {
            Telemetry.countMetric("req.count.care_teams.none");
          }
          Telemetry.histogramMetric("req.count.care_teams", results.length);
          return results;
        } catch (e) {
          throw new Error(`Failed fetching care team information for patient: ${e}`);
        }
      },
      "req.timing.care_teams",
      []
    )
  );
}
