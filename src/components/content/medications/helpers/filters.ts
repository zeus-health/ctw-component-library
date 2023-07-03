import { faUser } from "@fortawesome/free-solid-svg-icons";
import { dismissFilter } from "../../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { MedicationStatementModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function medicationFilters(medications: MedicationStatementModel[]): FilterItem[] {
  const prescriberNames = uniqueValues(medications, "lastPrescriber");
  const filters: FilterItem[] = [dismissFilter];

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
