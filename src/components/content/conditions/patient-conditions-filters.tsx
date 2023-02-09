import { useState } from "react";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { isArray, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient?: FilterChangeEvent;
  other?: FilterChangeEvent;
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

  // useEffect(() => {
  //   const filterChangeEvent: FilterChangeEvent = {};

  //   Object.entries(filters[collection]).forEach(([key, value]) => {
  //     const availableValues = availableFilters(conditions).filter(
  //       (filter) => filter.key === key
  //     )[0].values;

  //     let { selected } = value;

  //     if (isArray(value.selected)) {
  //       selected = selected.filter((val) => availableValues.includes(val));
  //     }
  //     filterChangeEvent[key] = {
  //       ...value,
  //       selected,
  //     };
  //   });

  //   updateFilters(filterChangeEvent);
  // }, [filters]);

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters(() => ({
      ...filters,
      [collection]: {
        ...newFilters,
      },
    }));
  }

  function getCurrentCollectionFilters(conditions: ConditionModel[]) {
    const filterChangeEvent: FilterChangeEvent = {};

    Object.entries(filters[collection]).forEach(([key, value]) => {
      const availableValues = availableFilters(conditions).filter(
        (filter) => filter.key === key
      )[0].values;

      let { selected } = value;

      if (isArray(value.selected)) {
        selected = selected.filter((val) => availableValues.includes(val));
      }
      filterChangeEvent[key] = {
        ...value,
        selected,
      };
    });

    return filterChangeEvent;
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
          return true;
        }
        if (isArray(filterItem.selected)) {
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

  return {
    filters,
    updateFilters,
    applyFilters,
    availableFilters,
    getCurrentCollectionFilters,
  };
}
