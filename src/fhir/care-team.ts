import { getIncludedResources } from "./bundle";
import { searchCommonRecords } from "./search-helpers";
import { CTWRequestContext, PatientModel, useFeatureFlaggedQueryWithPatient } from "..";
import { applyCareTeamFilters } from "@/components/content/care-team/helpers/filters";
import { createGraphqlClient } from "@/services/fqs/client";
import { CareTeamGraphqlResponse, careTeamsQuery } from "@/services/fqs/queries/care-teams";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientCareTeam() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    "careTeams",
    "req.timing.care_teams",
    getCareTeamFQS,
    getCareTeamODS
  );
}

async function getCareTeamODS(requestContext: CTWRequestContext, patient: PatientModel) {
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
}

async function getCareTeamFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const data = (await graphClient.request(careTeamsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    })) as CareTeamGraphqlResponse;
    const nodes = data.CareTeamConnection.edges.map((x) => x.node);
    const results = applyCareTeamFilters(nodes, {});

    if (results.length === 0) {
      Telemetry.countMetric("req.count.care_teams.none");
    }
    Telemetry.histogramMetric("req.count.care_teams", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching care teams information for patient: ${e}`);
  }
}
