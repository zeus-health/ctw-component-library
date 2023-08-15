import { dismissFilter } from "../../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { MedicationDispenseModel } from "@/fhir/models";

export const applyMedDispenseFilters = (data: fhir4.MedicationDispense[]) => {
  const medDispenseModel = data.map((m) => new MedicationDispenseModel(m));

  return medDispenseModel.filter((m) => m.PMARefillNotPickedUp === "PMARefillNotPickedUp");
  // Bump builder owned allergies to the front, so uniqBy favors them!
};

export function immunizationsFilter(): FilterItem[] {
  const filters: FilterItem[] = [dismissFilter];
  return filters;
}

export const defaultImmunizationsFilters: FilterChangeEvent = {};
