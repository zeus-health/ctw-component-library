import { useState } from "react";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { compact, isArray, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient: FilterChangeEvent;
  other: FilterChangeEvent;
};

const DEFAULT_FILTERS: Filters = {
  patient: {
    displayStatus: {
      key: "displayStatus",
      selected: ["Active", "Pending", "Unknown"],
      type: "checkbox",
    },
  },
  other: {
    displayStatus: {
      key: "displayStatus",
      selected: ["Active", "Pending", "Unknown"],
      type: "checkbox",
    },
  },
};

export function useConditionFilters(collection: FilterCollection) {
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters(() => ({
      ...filters,
      [collection]: {
        ...newFilters,
      },
    }));
  }

  function availableFilters(conditions: ConditionModel[]): FilterItem[] {
    return [
      {
        key: "displayStatus",
        type: "checkbox",
        icon: "eye",
        display: () => "Status",
        values: uniq(conditions.map((c) => c.displayStatus)),
      },
      {
        key: "ccsChapter",
        type: "checkbox",
        icon: "eye",
        display: () => "Category",
        values: compact(uniq(conditions.map((c) => c.ccsChapter))),
      },
    ];
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
    availableFilters,
  };
}
