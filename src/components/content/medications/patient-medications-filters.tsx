import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { MedicationStatementModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";
import { compact } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient: FilterChangeEvent;
  other: FilterChangeEvent;
};

export function medicationFilters(
  medications: MedicationStatementModel[]
): FilterItem[] {
  const prescriberNames = uniqueValues(medications, "lastPrescriber");

  return compact([
    {
      key: "isArchived",
      type: "tag",
      icon: "eye",
      display: ({ active }) =>
        active ? "dismissed records" : "show dismissed records",
    },
    prescriberNames.length < 2
      ? null
      : {
          key: "lastPrescriber",
          type: "checkbox",
          icon: "clipboard",
          values: prescriberNames,
          display: "prescriber",
        },
  ]);
}
