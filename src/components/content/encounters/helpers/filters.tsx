import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models/encounter";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function encounterFilters(encounters: EncounterModel[] | undefined): FilterItem[] {
  const filters: FilterItem[] = [];

  // TODO: filtering on has clinical notes (CDEV-307)

  return filters;
}

export const defaultEncounterFilters: FilterChangeEvent = {
  // type: {
  //   key: "type",
  //   selected: ["Diagnostic Report", "Encounter"],
  //   type: "checkbox",
  // },
};
