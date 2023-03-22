import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { MedicationStatementModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function medicationFilters(
  medications: MedicationStatementModel[],
  outside: boolean
): FilterItem[] {
  const prescriberNames = uniqueValues(medications, "lastPrescriber");
  const filters: FilterItem[] = [];

  if (outside) {
    filters.push({
      key: "isArchived",
      type: "tag",
      belowTheFold: true,
      icon: faEye,
      display: ({ listView }) =>
        listView ? "show dismissed records" : "dismissed records",
    });
  }

  if (prescriberNames.length > 1) {
    filters.push({
      key: "lastPrescriber",
      type: "checkbox",
      icon: faUser,
      values: prescriberNames,
      display: "prescriber",
    });
  }

  return filters;
}

export const defaultMedicationFilters: FilterChangeEvent = {};
