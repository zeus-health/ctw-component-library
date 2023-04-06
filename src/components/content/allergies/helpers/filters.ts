import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { AllergyModel } from "@/fhir/models/allergies";

export function allergyFilter(
  allergy: AllergyModel[] | undefined
): FilterItem[] {
  const filters: FilterItem[] = [];
  return filters;
}

export const defaultAllergyFilters: FilterChangeEvent = {};
