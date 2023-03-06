import { getIncludedResources } from "./bundle";
import { searchCommonRecords } from "./search-helpers";
import { applyCareTeamFilters } from "@/components/content/care-team/patient-careteam-filters";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

export function usePatientCareTeam() {
  return useQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    withTimerMetric(
      async (requestContext, patient) => {
        try {
          const { bundle, resources: careteam } = await searchCommonRecords(
            "CareTeam",
            requestContext,
            {
              patientUPID: patient.UPID,
              _include: "CareTeam:participant",
            }
          );
          const includedResources = getIncludedResources(bundle);
          return orderBy(
            applyCareTeamFilters(careteam, includedResources),
            [(ct) => ct.resource.period?.start || ""],
            ["desc"]
          );
        } catch (e) {
          throw new Error(
            `Failed fetching care team information for patient: ${e}`
          );
        }
      },
      "req.patient_care_team",
      []
    )
  );
}
