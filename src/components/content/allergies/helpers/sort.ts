import { SortOption } from "@/components/core/sort-button/sort-button";
import { AllergyModel } from "@/fhir/models/allergies";

export const defaultAllergySort: SortOption<AllergyModel> = {
  display: "Date (New to Old)",
  sorts: [{ key: "recordedDate", dir: "desc", isDate: true }],
};

export const allergySortOptions: SortOption<AllergyModel>[] = [
  defaultAllergySort,
  {
    display: "Date (Old to New)",
    sorts: [{ key: "recordedDate", dir: "asc", isDate: true }],
  },
];
