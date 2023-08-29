import { AllergyModel } from "@/fhir/models/allergies";
import { orderBy, uniqBy } from "@/utils/nodash";
import { sort } from "@/utils/sort";

export const applyAllergyFilters = (allergyModel: AllergyModel[], builderId: string) => {
  const sortedByDate = sort(allergyModel, "recordedDate", "desc", true);
  // Bump builder owned allergies to the front, so uniqBy favors them!
  const builderOwnedFirst = orderBy(sortedByDate, (a) => a.ownedByBuilder(builderId), "desc");
  return uniqBy(builderOwnedFirst, "lowercaseDisplay");
};
