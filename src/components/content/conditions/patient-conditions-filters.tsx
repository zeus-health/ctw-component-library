import { useState } from "react";
import { defaultConditionFilters } from "./filter-options";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { compact, isArray, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient: FilterChangeEvent;
  other: FilterChangeEvent;
};

export function useConditionFilters(collection: FilterCollection) {
  const [filters, setFilters] = useState<Filters>({
    patient: defaultConditionFilters,
    other: defaultConditionFilters,
  });

  function updateFilters(newFilters: Partial<FilterChangeEvent>) {
    setFilters(() => ({
      ...filters,
      [collection]: newFilters,
    }));
  }

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      collection === "patient" ? patientConditions : otherConditions;

    return conditions.filter((condition) =>
      Object.entries(filters[collection]).every(([_, filterItem]) => {
        if (filterItem?.type === "checkbox" && isArray(filterItem.selected)) {
          const filteredList = filterItem.selected.filter((item) =>
            compact(
              uniq(
                conditions.map((c) => c[filterItem.key as keyof ConditionModel])
              )
            ).includes(item)
          );

          const targetFilter =
            condition[filterItem.key as keyof ConditionModel] ?? "";

          return (
            filteredList.length < 1 ||
            filteredList.includes(String(targetFilter))
          );
        }

        return true;
      })
    );
  }

  return {
    filters,
    updateFilters,
    applyFilters,
  };
}
