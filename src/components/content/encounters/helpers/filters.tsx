import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models/encounter";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function encounterFilters(encounters: EncounterModel[] | undefined): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "noteType",
    type: "checkbox",
    icon: faClipboardCheck,
    display: "Note Type",
    values: [
      {
        name: "History of Present Illness",
        display: "History of Present Illness",
        key: "10164-2",
      },
    ],
  });

  return filters;
}

export const defaultEncounterFilters: FilterChangeEvent = {
  // TODO: filtering on has clinical notes (CDEV-307)
};

export function noteTypeFilter(selectedNoteTypes: string[]) {
  return (data: EncounterModel[]) =>
    data.filter((d) =>
      d.clinicalNotes.some((note) =>
        note.category?.some((category) =>
          category.coding?.some((coding) => coding.code && selectedNoteTypes.includes(coding.code))
        )
      )
    );
}
