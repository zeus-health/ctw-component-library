import { dismissFilter } from "../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { EncounterModel } from "@/fhir/models";

export function adtFilter(): FilterItem[] {
  const filters: FilterItem[] = [dismissFilter];

  filters.push(
    {
      key: "adtStatus",
      type: "checkbox",
      values: ["Active", "Discharged"],
      predicate: (values: string[], item: object) => {
        if (values.length === 0) {
          return true;
        }
        const encounter = item as EncounterModel;
        const status = encounter.periodEnd ? "Discharged" : "Active";
        return values.includes(status);
      },
      display: "ADT Status",
    },
    {
      key: "physicalTypes",
      type: "checkbox",
      display: "Location Type",
      values: [
        "Building",
        "Home Health",
        "Hospice",
        "Hospital",
        "Rehab Hospital",
        "Skilled Nursing Facility",
        "Urgent Care",
        "None",
      ],
      predicate: (values: string[], item: object) => {
        if (values.length === 0) {
          return true;
        }
        const encounter = item as EncounterModel;
        const status = encounter.physicalTypes;
        return values.includes(status);
      },
    }
  );
  return filters;
}

export const defaultADTFilters: FilterChangeEvent = {};
