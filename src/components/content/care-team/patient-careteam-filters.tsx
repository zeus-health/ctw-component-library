import { CareTeamModel } from "@/fhir/models/careteam";
import { isEqual, uniqWith } from "@/utils/nodash";

export const applyCareTeamFilters = (data: fhir4.CareTeam[]) => {
  const careTeamModel = data.map((careteam) => new CareTeamModel(careteam));
  const careTeamData = uniqWith(careTeamModel, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return careTeamData;
};

const valuesToDedupeOn = (careteam: CareTeamModel) => [careteam.status];
