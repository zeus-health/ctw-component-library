import { cloneDeep, merge } from "lodash";
import { useState } from "react";
import { ConditionModel } from "@/fhir/models";

export type FilterCollection = "patient" | "other";

export type Filters = {
  collection: FilterCollection;
  showHistoric: boolean;
};

export function useConditionFilters() {
  const [filters, setFilters] = useState<Filters>({
    collection: "patient",
    showHistoric: false,
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters(merge(cloneDeep(filters), newFilters));
  }

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      filters.collection === "patient" ? patientConditions : otherConditions;
    return conditions.filter((c) => {
      if (filters.showHistoric) return true;

      return ["Active", "Pending"].includes(c.displayStatus);
    });
  }

  return { filters, updateFilters, applyFilters };
}
