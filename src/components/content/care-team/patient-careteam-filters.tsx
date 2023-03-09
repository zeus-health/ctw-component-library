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
      const practitioner = careTeamObject.getPractitionerByID(
        participant.member?.reference as string
      );
      if (practitioner?.id) {
        if (participant.member?.reference) {
          const careTeamPractitioner = new CareTeamPractitionerModel(
            careTeamObject,
            practitioner
          );
          if (careTeamMemberMap.has(practitioner.id)) {
            const latestPractitioner = careTeamMemberMap.get(practitioner.id);
            if (latestPractitioner && careTeamPractitioner.effectiveStartDate) {
              careTeamMemberMap.set(
                practitioner.id,
                maxBy(
                  [careTeamPractitioner, latestPractitioner],
                  "effectiveStartDate"
                )
              );
            } else {
              careTeamMemberMap.set(practitioner.id, careTeamPractitioner);
            }
          } else {
            careTeamMemberMap.set(practitioner.id, careTeamPractitioner);
          }
        }
      }
    });
  });

  return compact([...careTeamMemberMap.values()]);
};
