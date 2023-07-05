import { dismissFilter } from "../../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { ResourceMap } from "@/fhir/types";
import { orderBy, uniqBy } from "@/utils/nodash";
import { sort } from "@/utils/sort";

export const applyImmunizationFilters = (
  data: fhir4.Immunization[],
  builderId: string,
  includedResources?: ResourceMap
) => {
  const immunizationModel = data.map(
    (immunization) => new ImmunizationModel(immunization, includedResources)
  );

  const sortedByDate = sort(immunizationModel, "occurrence", "desc", true);
  // Bump builder owned allergies to the front, so uniqBy favors them!
  const builderOwnedFirst = orderBy(sortedByDate, (a) => a.ownedByBuilder(builderId), "desc");
  return uniqBy(builderOwnedFirst, "uniqueKey");
};

export function immunizationsFilter(): FilterItem[] {
  const filters: FilterItem[] = [dismissFilter];
  return filters;
}

export const defaultImmunizationsFilters: FilterChangeEvent = {};
