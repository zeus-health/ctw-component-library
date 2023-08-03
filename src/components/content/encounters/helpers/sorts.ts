import { SortOption } from "@/components/core/sort-button/sort-button";
import { EncounterModel } from "@/fhir/models/encounter";

export const defaultEncounterSort: SortOption<EncounterModel> = {
  display: "Date (New to Old)",
  sorts: [{ key: "periodStart", dir: "desc", isDate: true }],
};

export const encounterSortOptions: SortOption<EncounterModel>[] = [
  defaultEncounterSort,
  {
    display: "Date (Old to New)",
    sorts: [{ key: "periodStart", dir: "asc", isDate: true }],
  },
];
