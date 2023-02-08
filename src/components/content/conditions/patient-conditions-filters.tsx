import { useState } from "react";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { DisplayStatus } from "@/fhir/models/condition";
import { uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient?: FilterChangeEvent;
  other?: FilterChangeEvent;
};

export type ConditionFilters = {
  status?: DisplayStatus[];
  ccsChapter?: string[];
};

const DEFAULT_FILTERS: Omit<Filters, "activeCollection"> = {
  patient: {
    status: {
      key: "status",
      selected: ["Active", "Pending", "Unknown"],
      type: "checkbox",
    },
  },
  other: {
    status: {
      key: "status",
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
        key: "status",
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
    const conditionFilters = filters[collection];

    console.log("conditionFilters", conditionFilters);

    return conditions.filter((c) => {
      const statusFilter =
        !conditionFilters?.status.selected ||
        !conditionFilters.status.selected ||
        conditionFilters.status.selected.length < 1 ||
        conditionFilters.status.selected.includes(c.displayStatus);

      const ccsChapterFilter =
        !conditionFilters?.ccsChapter ||
        !conditionFilters.ccsChapter.selected ||
        conditionFilters.ccsChapter.selected.length < 1 ||
        conditionFilters.ccsChapter.selected.includes(c.ccsChapter ?? "");

      return statusFilter && ccsChapterFilter;
    });
  }

  return { filters, updateFilters, applyFilters, availableFilters };
}
