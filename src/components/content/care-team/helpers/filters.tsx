import { CareTeamModel } from "@/fhir/models/careteam";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { ResourceMap } from "@/fhir/types";
import { isEqual, orderBy, uniqWith } from "@/utils/nodash";

export const applyCareTeamFilters = (data: fhir4.CareTeam[], includedResources: ResourceMap) => {
  const careTeamModels = data.map((careteam) => new CareTeamModel(careteam, includedResources));

  const careTeamPractitionerModels: CareTeamPractitionerModel[] = [];
  careTeamModels.forEach((careTeam) =>
    careTeam.resource.participant?.forEach((participant) => {
      const practitioner = careTeam.getPractitionerByID(participant.member?.reference as string);
      if (practitioner?.id && participant.member?.reference) {
        careTeamPractitionerModels.push(new CareTeamPractitionerModel(careTeam, practitioner));
      }
    })
  );

  const sortedCareTeamPractitionerModels = orderBy(
    careTeamPractitionerModels,
    ["effectiveStartDate", "id"],
    ["desc", "desc"]
  );

  return uniqWith(sortedCareTeamPractitionerModels, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );
};

const valuesToDedupeOn = (careTeam: CareTeamPractitionerModel) => [
  careTeam.effectiveStartDate,
  careTeam.role,
  careTeam.qualification,
  careTeam.practitionerName,
];
