import { CTWRequestContext, PatientModel, useQueryWithPatient } from "..";
import { applyCareTeamFilters } from "@/components/content/care-team/helpers/filters";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { CareTeamGraphqlResponse, careTeamsQuery } from "@/services/fqs/queries/care-teams";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientCareTeam() {
  return useQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    withTimerMetric(getCareTeamFQS, "req.timing.care_teams")
  );
}

async function getCareTeamFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<CareTeamGraphqlResponse>(graphClient, careTeamsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    });

    const nodes = data.CareTeamConnection.edges.map((x) => x.node);
    const results = applyCareTeamFilters(nodes, {});

    if (results.length === 0) {
      Telemetry.countMetric("req.count.care_teams.none", 1);
    }
    Telemetry.histogramMetric("req.count.care_teams", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching care teams information for patient: ${e}`);
  }
}
