import { CareTeamModel } from "./models/careteam";
import { CareTeamPractitionerModel } from "./models/careteam-practitioner";
import { CTWRequestContext, PatientModel, useQueryWithPatient } from "..";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { CareTeamGraphqlResponse, careTeamsQuery } from "@/services/fqs/queries/care-teams";
import { isEqual, orderBy, uniqWith } from "@/utils/nodash";
import { QUERY_KEY_CARETEAM } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientCareTeamMembers() {
  return useQueryWithPatient(
    QUERY_KEY_CARETEAM,
    [],
    withTimerMetric(getCareTeamMembersFromFQS, "req.timing.care_teams")
  );
}

async function getCareTeamMembersFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
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
    const results = getFilteredCareTeamMembers(nodes);

    if (results.length === 0) {
      Telemetry.countMetric("req.count.care_teams.none", 1);
    }
    Telemetry.histogramMetric("req.count.care_teams", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching care teams information for patient: ${e}`);
  }
}

export const getFilteredCareTeamMembers = (data: fhir4.CareTeam[]) => {
  const careTeams = data.map((careteam) => new CareTeamModel(careteam));

  const careTeamMembers: CareTeamPractitionerModel[] = [];
  careTeams.forEach((careTeam) =>
    careTeam.resource.participant?.forEach((participant) => {
      const practitioner = careTeam.getPractitionerByID(participant.member);
      if (practitioner?.id && participant.member?.reference) {
        careTeamMembers.push(new CareTeamPractitionerModel(careTeam, practitioner));
      }
    })
  );

  const filteredCareTeamMembers = careTeamMembers.filter((ct) => ct.practitionerName);

  const sortedCareTeamPractitionerModels = orderBy(
    filteredCareTeamMembers,
    ["effectiveStartDate", "id"],
    ["desc", "desc"]
  );

  return uniqWith(sortedCareTeamPractitionerModels, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );
};

const valuesToDedupeOn = (careTeam: CareTeamPractitionerModel) => [careTeam.practitionerName];
