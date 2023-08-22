import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models/encounter";
import { mergeWith } from "@/utils/nodash";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function encounterFilters(encounters: EncounterModel[] | undefined): FilterItem[] {
  const filters: FilterItem[] = [];

  // TODO: filtering on has clinical notes (CDEV-307)

  return filters;
}

export const defaultEncounterFilters: FilterChangeEvent = {
  // TODO: filtering on has clinical notes (CDEV-307)
};

// Dedupes encounters by patient, periodStart, class, type, and location.
// Merges their properties to maximize information.
export function dedupeAndMergeEncounters(encounters: EncounterModel[]): EncounterModel[] {
  const dedupedEncounters: EncounterModel[] = [];

  // Group up the encounters that need to be merged
  const dupeGroups = new Map<string, EncounterModel[]>();
  encounters.forEach((encounter) => {
    if (
      !encounter.patientUPID ||
      !encounter.periodStart ||
      !encounter.class ||
      !encounter.resource.type ||
      !encounter.location
    ) {
      // Only group it if all necessary values are non-null.
      dedupedEncounters.push(encounter);
    } else {
      const key: string = JSON.stringify({
        upid: encounter.patientUPID,
        periodStart: encounter.periodStart || "",
        class: encounter.resource.class,
        type: encounter.resource.type,
        location: encounter.location || "",
      });
      const val = dupeGroups.get(key);
      if (val) {
        val.push(encounter);
      } else {
        dupeGroups.set(key, [encounter]);
      }
    }
  });

  // Merge the encounters in each group
  dupeGroups.forEach((encs) => {
    // Sort them to prioritize the most recently updated encounter
    encs.sort((a, b) => {
      const aVal = a.lastUpdated ? new Date(a.lastUpdated).valueOf() : 0;
      const bVal = b.lastUpdated ? new Date(b.lastUpdated).valueOf() : 0;
      return bVal - aVal;
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
