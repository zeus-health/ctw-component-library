import { CTWRequestContext, PatientModel, useFeatureFlaggedQueryWithPatient } from "..";
import { applyCareTeamFilters } from "@/components/content/care-team/helpers/filters";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { CareTeamGraphqlResponse, careTeamsQuery } from "@/services/fqs/queries/care-teams";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientCareTeam() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    "careTeams",
    "req.timing.care_teams",
    getCareTeamFQS
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
      Telemetry.countMetric("req.count.care_teams.none", 1, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.care_teams", results.length, ["fqs"]);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching care teams information for patient: ${e}`);
  }
}
