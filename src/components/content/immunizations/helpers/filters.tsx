import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { ResourceMap } from "@/fhir/types";
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

  // pull out unique allergies preferring those owned by the builder
  const immunizationsDataMap = new Map<string, ImmunizationModel>();
  sortedByDate.forEach((immunization) => {
    // We want a unique record per immunization and date given.
    // The type of the immunization is ideally the CVX code, but if there's no CVX code
    // then we'll fall back to the description.
    const key = `${immunization.cvxCode || immunization.description} - ${immunization.occurrence}`;
    const existingImmunization = immunizationsDataMap.get(key);

    if (
      !existingImmunization ||
      (immunization.ownedByBuilder(builderId) && !existingImmunization.ownedByBuilder(builderId))
    ) {
      immunizationsDataMap.set(key, immunization);
    }
  });

  const uniqueImmunizations = Array.from(immunizationsDataMap.values());

  return uniqueImmunizations;
};

export function immunizationFilter(): FilterItem[] {
  const filters: FilterItem[] = [];
  return filters;
}

export const defaultImmunizationFilters: FilterChangeEvent = {};
