import { AllergyModel } from "@/fhir/models/allergies";
import { ResourceMap } from "@/fhir/types";
import { sort } from "@/utils/sort";

export const applyAllergyFilters = (
  data: fhir4.AllergyIntolerance[],
  builderId: string,
  includedResources?: ResourceMap
) => {
  const allergyModel = data.map((allergy) => new AllergyModel(allergy, includedResources));

  const sortedByDate = sort(allergyModel, "recordedDate", "desc", true);

  // pull out unique allergies preferring those owned by the builder
  const allergyDataMap = new Map<string, AllergyModel>();
  sortedByDate.forEach((allergy) => {
    const { lowercaseDisplay } = allergy;
    const existingAllergy = allergyDataMap.get(lowercaseDisplay);

    if (
      !existingAllergy ||
      (allergy.ownedByBuilder(builderId) && !existingAllergy.ownedByBuilder(builderId))
    ) {
      allergyDataMap.set(lowercaseDisplay, allergy);
    }
  });

  const uniqueAllergies = Array.from(allergyDataMap.values());

  return uniqueAllergies;
};
