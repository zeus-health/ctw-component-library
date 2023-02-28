import { CareTeamModel } from "@/fhir/models/careteam";
import { ResourceMap } from "@/fhir/types";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyCareTeamFilters = (
  data: fhir4.CareTeam[],
  includedResources: ResourceMap
) => {
  const careTeamModel = data.map(
    (careteam) => new CareTeamModel(careteam, includedResources)
  );
  // Only want to obtain records that have a period.start but no period.end
  const currentCareTeam = careTeamModel.filter(
    (careTeam) => !careTeam.periodEnd
  );
  const careTeamData = uniqWith(currentCareTeam, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return careTeamData;
};

const valuesToDedupeOn = (careteam: CareTeamModel) => [
  careteam.status,
  careteam.periodStart,
  careteam.role,
  careteam.practitionerQualification,
  careteam.includedPerformer,
];
