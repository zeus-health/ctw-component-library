import { AllergyModel } from "@/fhir/models/allergies";
import { ResourceMap } from "@/fhir/types";
import { isEqual, uniqWith } from "@/utils/nodash";
import { sort } from "@/utils/sort";

export const applyAllergyFilters = (
  data: fhir4.AllergyIntolerance[],
  builderId: string,
  includedResources?: ResourceMap
) => {
  const allergyModel = data.map((allergy) => new AllergyModel(allergy, includedResources));

  const sortedByDate = sort(allergyModel, "recordedDate", "desc", true);

  const allergyData = uniqWith(sortedByDate, (a, b) => {
    const valuesA = valuesToDedupeOn(a);
    const valuesB = valuesToDedupeOn(b);

    // prefer returning first party records so we can distinguish those in the table
    if (a.ownedByBuilder(builderId) && !b.ownedByBuilder(builderId)) {
      return true;
    }
    if (!a.ownedByBuilder(builderId) && b.ownedByBuilder(builderId)) {
      return false;
    }

    return isEqual(valuesA, valuesB);
  });

  return allergyData;
};

const valuesToDedupeOn = (allergy: AllergyModel) => [allergy.lowercaseDisplay];
