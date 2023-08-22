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
        name: "Assessments / Plans",
        key: "51847-2, 18776-5",
      },
      {
        name: "Diagnostic Narratives",
        key: "34109-9, 30954-2",
      },
      {
        name: "Discharge Summary",
        key: "18842-5",
      },
      {
        name: "History of Present Illness",
        key: "10164-2",
      },
      {
        name: "Reason for Visit",
        key: "29299-5",
      },
      {
        name: "Other",
        key: "other",
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
