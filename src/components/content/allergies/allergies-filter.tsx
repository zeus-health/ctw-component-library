import { AllergyModel } from "@/fhir/models/allergies";
import { ResourceMap } from "@/fhir/types";
import { isEqual, uniqWith } from "@/utils/nodash";
import { sort } from "@/utils/sort";

export const applyAllergyFilters = (
  data: fhir4.AllergyIntolerance[],
  includedResources: ResourceMap
) => {
  const allergyModel = data.map(
    (allergy) => new AllergyModel(allergy, includedResources)
  );

  const sortedByDate = sort(allergyModel, "recordedDate", "desc", true);

  const allergyData = uniqWith(sortedByDate, (a, b) =>
    isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
  );

  return allergyData;
};

const valuesToDedupeOn = (allergy: AllergyModel) => [allergy.lowercaseDisplay];
