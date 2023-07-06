import { AllergyModel } from "@/fhir/models/allergies";
import { ResourceMap } from "@/fhir/types";
import { orderBy, uniqBy } from "@/utils/nodash";
import { sort } from "@/utils/sort";

export const applyAllergyFilters = (
  data: fhir4.AllergyIntolerance[],
  builderId: string,
  includedResources?: ResourceMap
) => {
  const allergyModel = data.map((allergy) => new AllergyModel(allergy, includedResources));
  const sortedByDate = sort(allergyModel, "recordedDate", "desc", true);
  // Bump builder owned allergies to the front, so uniqBy favors them!
  const builderOwnedFirst = orderBy(sortedByDate, (a) => a.ownedByBuilder(builderId), "desc");
  return uniqBy(builderOwnedFirst, "lowercaseDisplay");
};
