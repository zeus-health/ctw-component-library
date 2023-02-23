import { CareTeamModel } from "@/fhir/models/careteam";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyCareTeamFilters = (data: fhir4.CareTeam[]) => {
  const careTeamModel = data.map((careteam) => new CareTeamModel(careteam));
  // Only want to obtain records that have a period.start but no period.end
  const currentCareTeam = careTeamModel.filter(
    (careTeam) => !careTeam.periodEnd
  );
  const careTeamData = uniqWith(currentCareTeam, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return careTeamData;
};

const valuesToDedupeOn = (careteam: CareTeamModel) => [careteam.status];
