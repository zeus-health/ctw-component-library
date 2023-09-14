import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models/encounter";
import { SYSTEM_LOINC } from "@/fhir/system-urls";
import { compact, mergeWith } from "@/utils/nodash";

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

  const availableNoteTypeValues = noteTypeValues.filter((value) =>
    encounters?.some((encounter) => noteTypePredicate([value.key], encounter))
  );
  const hasOtherEncounterNoteTypes =
    encounters &&
    encounters.filter(
      (encounter) => !noteTypeValues.some((value) => noteTypePredicate([value.key], encounter))
    ).length > 0;

  if (availableNoteTypeValues.length > 0 || hasOtherEncounterNoteTypes) {
    filters.push({
      key: "noteType",
      type: "checkbox",
      icon: faClipboardCheck,
      display: "Note Type",
      predicate: noteTypePredicate,
      values: compact([
        ...availableNoteTypeValues,
        hasOtherEncounterNoteTypes
          ? {
              name: "Other",
              key: "other",
            }
          : undefined,
      ]),
    });
  }

  return filters;
}

export const ENCOUNTER_DEDUPE_UTILS = {
  patientEncounter: {
    generateKey: (encounter: EncounterModel) =>
      JSON.stringify({
        upid: encounter.patientUPID,
        periodStart: encounter.periodStart || "",
        class: encounter.resource.class,
        type: encounter.resource.type,
        location: encounter.location || "",
      }),
    hasRequiredFields: (encounter: EncounterModel) =>
      encounter.patientUPID &&
      encounter.periodStart &&
      encounter.class &&
      encounter.resource.type &&
      encounter.location,
  },
  patientsADT: {
    generateKey: (encounter: EncounterModel) =>
      JSON.stringify({
        upid: encounter.patientUPID,
        periodStart: encounter.periodStart || "",
        location: encounter.location || "",
      }),
    hasRequiredFields: (encounter: EncounterModel) =>
      encounter.patientUPID && encounter.periodStart && encounter.location,
  },
};

// Dedupes encounters by patient, periodStart, class, type, and location.
// Merges their properties to maximize information.
export function dedupeAndMergeEncounters(
  encounters: EncounterModel[],
  dedupeMethod: keyof typeof ENCOUNTER_DEDUPE_UTILS
): EncounterModel[] {
  // Group up the encounters that need to be merged
  const dupeGroups = new Map<string, EncounterModel[]>();
  encounters.forEach((encounter, i) => {
    const key: string = ENCOUNTER_DEDUPE_UTILS[dedupeMethod].generateKey(encounter);
    const val = dupeGroups.get(key);

    if (!ENCOUNTER_DEDUPE_UTILS[dedupeMethod].hasRequiredFields(encounter)) {
      dupeGroups.set(key + i, [encounter]); // If it's missing values, put it in a lone group.
    } else if (val) {
      val.push(encounter);
    } else {
      dupeGroups.set(key, [encounter]);
    }
  });

  const dedupedEncounters = mergeEncounters(dupeGroups);

  return dedupedEncounters;
}

function mergeEncounters(dupeGroups: Map<string, EncounterModel[]>): EncounterModel[] {
  const dedupedEncounters: EncounterModel[] = [];

  dupeGroups.forEach((encs) => {
    // If there's only one encounter in the group, no need to merge
    if (encs.length === 1) {
      dedupedEncounters.push(encs[0]);
      return;
    }
    // Sort them to prioritize the most recently updated encounter
    encs.sort((a, b) => {
      const aVal = a.lastUpdated ? new Date(a.lastUpdated).valueOf() : 0;
      const bVal = b.lastUpdated ? new Date(b.lastUpdated).valueOf() : 0;
      return aVal - bVal;
    });
    const mergedEncounter: EncounterModel = encs[0];

    if (encs.length > 1) {
      const sortedEncResources = encs.map((enc) => enc.resource);
      // Merge the encounters
      const mergedResource = sortedEncResources.reduce((merged, curr) => mergeWith(merged, curr));
      mergedEncounter.resource = mergedResource;
    }
    dedupedEncounters.push(mergedEncounter);
  });

  return dedupedEncounters;
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
