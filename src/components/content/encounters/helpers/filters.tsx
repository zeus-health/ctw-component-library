import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models/encounter";
import { SYSTEM_LOINC } from "@/fhir/system-urls";

export const noteTypeValues = [
  {
    name: "Assessments / Plans",
    key: ["51847-2", "18776-5"].join(","),
  },
  {
    name: "Diagnostic Narratives",
    key: ["34109-9", "30954-2"].join(","),
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
];

export const defaultEncounterFilters: FilterChangeEvent = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function encounterFilters(encounters: EncounterModel[] | undefined): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "noteType",
    type: "checkbox",
    icon: faClipboardCheck,
    display: "Note Type",
    predicate: noteTypePredicate,
    values: [
      ...noteTypeValues.map((v) => ({ ...v })),
      {
        name: "Other",
        key: "other",
      },
    ],
  });

  return filters;
}

export function noteTypePredicate(values: string[], item: object): boolean {
  if (values.length === 0) return true;

  // Values can contain comma separated values, so we need to split them.
  const parsedValues = values.flatMap((value) => value.split(","));
  const parsedAllValues = noteTypeValues.flatMap((v) => v.key.split(","));

  const encounter = item as EncounterModel;
  const hasValueMatch = encounter.clinicalNotes.some((note) =>
    note.category?.some((category) =>
      category.coding?.some(
        (coding) =>
          coding.system === SYSTEM_LOINC && coding.code && parsedValues.includes(coding.code)
      )
    )
  );
  const hasOtherMatch =
    parsedValues.includes("other") &&
    !encounter.clinicalNotes.some((note) =>
      note.category?.some((category) =>
        category.coding?.some(
          (coding) =>
            coding.system === SYSTEM_LOINC && coding.code && parsedAllValues.includes(coding.code)
        )
      )
    );
  return hasValueMatch || hasOtherMatch;
}
