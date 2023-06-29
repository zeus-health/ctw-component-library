import { SortOption } from "@/components/core/sort-button/sort-button";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const defaultImmunizationSort: SortOption<ImmunizationModel> = {
  display: "Date (New to Old)",
  sorts: [{ key: "occurrence", dir: "desc", isDate: true }],
};

export const immunizationSortOptions: SortOption<ImmunizationModel>[] = [
  defaultImmunizationSort,
  {
    display: "Date (Old to New)",
    sorts: [{ key: "occurrence", dir: "asc", isDate: true }],
  },
  {
    display: "Immunization (A-Z)",
    sorts: [
      { key: "description", dir: "asc" },
      { key: "occurrence", dir: "desc", isDate: true },
    ],
  },
  {
    display: "Immunization (Z-A)",
    sorts: [
      { key: "description", dir: "desc" },
      { key: "occurrence", dir: "desc", isDate: true },
    ],
  },
];
