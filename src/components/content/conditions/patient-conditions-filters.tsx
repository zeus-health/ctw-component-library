import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { ConditionModel } from "@/fhir/models";
import { DisplayStatus } from "@/fhir/models/condition";
import { compact, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";
export type FilterTypes = { status?: DisplayStatus[]; ccsChapter?: string[] };
export type Filters = {
  activeCollection: FilterCollection;
  patient?: FilterTypes;
  other?: FilterTypes;
};

export type FilterActions = {
  removeFilter: (filterName: keyof FilterTypes) => void;
  addToFilter: (
    filterName: keyof FilterTypes,
    filterType: "ADD" | "REMOVE",
    value: string
  ) => void;
};

export type AvailableFilters = {
  [key: string]: {
    selected: string[];
    available: string[];
  };
}[];

const DEFAULT_FILTER_STATE: Omit<Filters, "activeCollection"> = {
  patient: {
    status: ["Active", "Pending", "Unknown"],
    ccsChapter: ["Mental and Behavioral"],
  },
  other: { status: ["Active", "Pending"] },
};

const FILTER_MAP = { status: "status", ccsChapter: "category" };

export function useConditionFilters() {
  const [filters, setFilters] = useState<Filters>({
    activeCollection: "patient",
    ...DEFAULT_FILTER_STATE,
  });

  function updateFilters(newFilters: Partial<Filters>) {
    console.log("prev state", newFilters);
    setFilters((prevState) => {
      console.log("test", filters);
      return { ...prevState, ...newFilters };
    });
  }

  const actions = {
    removeFilter: (filterName: keyof FilterTypes) =>
      updateFilters({
        [filters.activeCollection]: { [filterName]: [] },
      }),
    clearFilters: () => updateFilters({ patient: {}, other: {} }),
    resetFilters: () => updateFilters({ ...DEFAULT_FILTER_STATE }),
    addToFilter: (
      filterName: keyof FilterTypes,
      filterType: "ADD" | "REMOVE",
      value: string
    ) => {
      console.log(
        "test",
        filters[filters.activeCollection][FILTER_MAP[filterName]]
      );
      let newValues = [...filters[filters.activeCollection][filterName]];
      switch (filterType) {
        case "ADD":
          newValues = [...newValues, value];
          break;
        case "REMOVE":
          newValues = newValues.filter((item) => item !== value);
          break;
        default:
          newValues = [];
      }

      updateFilters({
        [filters.activeCollection]: { [filterName]: newValues },
      });
    },
  };

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      filters.activeCollection === "patient"
        ? patientConditions
        : otherConditions;

    return conditions.filter((c) => {
      const conditionFilters = filters[filters.activeCollection];

      const statusFilter =
        !conditionFilters?.status ||
        conditionFilters.status.length < 1 ||
        conditionFilters.status.includes(c.displayStatus);

      const ccsChapterFilter =
        !conditionFilters?.ccsChapter ||
        conditionFilters.ccsChapter.length < 1 ||
        conditionFilters.ccsChapter.includes(c.ccsChapter ?? "");

      return statusFilter && ccsChapterFilter;
    });
  }

  function currentAndAvailableFilterMap(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    console.log(
      "availableFilters(patientConditions, otherConditions)",
      availableFilters(patientConditions, otherConditions)
    );
    return Object.entries(
      availableFilters(patientConditions, otherConditions)
    ).map(([key, values]) => {
      const selected = filters[filters.activeCollection][key] || [];
      return {
        [FILTER_MAP[key as keyof typeof FILTER_MAP]]: {
          available: compact(values),
          selected: selected.filter((val) => values.includes(val)),
        },
      };
    });
  }

  function availableFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      filters.activeCollection === "patient"
        ? patientConditions
        : otherConditions;

    return {
      status: uniq(conditions.map((c) => c.displayStatus)),
      ccsChapter: uniq(conditions.map((c) => c.ccsChapter)),
    };
  }

  return {
    filters,
    updateFilters,
    applyFilters,
    availableFilters,
    actions,
    currentAndAvailableFilterMap,
  };
}

export const AddFilter = ({ actions }) => (
  <DropdownMenuAction
    options={{ items: [{ name: "Category" }, { name: "Status" }] }}
    pinnedActions={[
      { name: "Reset Filters", action: () => actions.resetFilters() },
      {
        name: "Clear All Filters",
        action: () => {
          actions.clearFilters();
        },
      },
    ]}
  >
    <div
      className="ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-1 ctw-rounded-md ctw-border-none ctw-bg-transparent ctw-py-3 ctw-px-3 ctw-text-content-light hover:ctw-bg-bg-lighter"
      role="button"
    >
      <span>
        <PlusIcon className="ctw-h-3.5 ctw-w-3.5" />
      </span>

      <span>Add Filter</span>
    </div>
  </DropdownMenuAction>
);
