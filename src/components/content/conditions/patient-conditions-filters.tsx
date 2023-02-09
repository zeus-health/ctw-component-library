import { useState } from "react";
import { ConditionModel } from "@/fhir/models";
import { cloneDeep, merge } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  showHistoric: boolean;
};

export function useConditionFilters(collection: FilterCollection) {
  const [filters, setFilters] = useState<Filters>({
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
      collection === "patient" ? patientConditions : otherConditions;
    return conditions.filter((c) => {
      if (filters.showHistoric) return true;

      return ["Active", "Pending"].includes(c.displayStatus);
    });
  }

  return { filters, updateFilters, applyFilters };
}
