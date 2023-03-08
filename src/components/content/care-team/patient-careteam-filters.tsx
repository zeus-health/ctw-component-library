import { CareTeamModel } from "@/fhir/models/careteam";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { ResourceMap } from "@/fhir/types";
import { compact, maxBy } from "@/utils/nodash";

export const applyCareTeamFilters = (
  data: fhir4.CareTeam[],
  includedResources: ResourceMap
) => {
  const careTeamModels = data.map(
    (careteam) => new CareTeamModel(careteam, includedResources)
  );

  const careTeamMemberMap = new Map<
    string,
    CareTeamPractitionerModel | undefined
  >();

  careTeamModels.forEach((careTeamObject) => {
    careTeamObject.resource.participant?.forEach((participant) => {
      if (participant.member?.reference) {
        const careTeamPractitioner = new CareTeamPractitionerModel(
          careTeamObject,
          participant.member.reference
        );
        if (careTeamMemberMap.has(participant.member.reference)) {
          const latestPractitioner = careTeamMemberMap.get(
            participant.member.reference
          );
          if (latestPractitioner && careTeamPractitioner.effectiveStartDate) {
            careTeamMemberMap.set(
              participant.member.reference,
              maxBy(
                [careTeamPractitioner, latestPractitioner],
                "effectiveStartDate"
              )
            );
          } else {
            careTeamMemberMap.set(
              participant.member.reference,
              careTeamPractitioner
            );
          }
        } else {
          careTeamMemberMap.set(
            participant.member.reference,
            careTeamPractitioner
          );
        }
      }
    });
  });

  console.log("CareTeamMemberMap", careTeamMemberMap);

  console.log("CareTeamModel", careTeamModels);
  // Create a custom model that would be

  return compact([...careTeamMemberMap.values()]);
};
