import { useState } from "react";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { isArray, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient?: FilterChangeEvent;
  other?: FilterChangeEvent;
};

const DEFAULT_FILTERS: Omit<Filters, "activeCollection"> = {
  patient: {
    status: {
      key: "displayStatus",
      selected: ["Active", "Pending", "Unknown"],
      type: "checkbox",
    },
  },
  other: {
    status: {
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

  function availableFilters(conditions: ConditionModel[]) {
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
        values: uniq(conditions.map((c) => c.ccsChapter)),
      },
    ];
  }

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      collection === "patient" ? patientConditions : otherConditions;

    return conditions.filter((c) =>
      Object.entries(filters[collection]).every(([key, filterItem]) => {
        if (!filterItem.selected) {
          return false;
        }
        if (isArray(filterItem.selected)) {
          console.log("test", filterItem);
          return (
            filterItem.selected.length < 1 ||
            filterItem.selected.includes(
              c[filterItem.key as keyof ConditionModel] ?? ""
            )
          );
        }

        return true;
      })
    );
  }

  return { filters, updateFilters, applyFilters, availableFilters };
}
