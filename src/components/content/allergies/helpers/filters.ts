import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { compact, uniq } from "@/utils/nodash/fp";
import { AllergyModel } from "@/fhir/models/allergies";

export function allergyFilter(
  allergy: AllergyModel[] | undefined
): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "type",
    type: "checkbox",
    icon: faClipboardCheck,
    display: "Type",
    values: compact(uniq(allergy?.map((a) => a.type))),
  });

  return filters;
}

export const defaultAllergyFilters: FilterChangeEvent = {
  type: {
    key: "type",
    selected: ["Allergy", "Intolerance"],
    type: "checkbox",
  },
};
