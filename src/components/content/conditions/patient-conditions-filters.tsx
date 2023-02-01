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
    // ccsChapter: ["Mental and Behavioral"],
  },
  other: { status: ["Active", "Pending"] },
};

export const FILTER_MAP = { status: "status", ccsChapter: "category" };

export function useConditionFilters() {
  const [filters, setFilters] = useState<Filters>({
    activeCollection: "patient",
    ...DEFAULT_FILTER_STATE,
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters((prevState) => ({
      ...prevState,
      ...{ [filters.activeCollection]: newFilters },
    }));
  }

  function updateCollection(newFilters: Partial<Filters>) {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }));
  }

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

  return {
    filters,
    updateFilters,
    applyFilters,
    updateCollection,
  };
}

export const availableConditionFilters = (conditions: ConditionModel[]) => ({
  status: uniq(conditions.map((c) => c.displayStatus)),
  ccsChapter: uniq(conditions.map((c) => c.ccsChapter)),
});

export const getUnfilteredCollection = (
  patientConditions: ConditionModel[],
  otherConditions: ConditionModel[],
  activeCollection: string
) => (activeCollection === "patient" ? patientConditions : otherConditions);

export const selectedAndAvailableFilters = (
  conditions: ConditionModel[],
  filters: FilterTypes
) =>
  Object.entries(availableConditionFilters(conditions)).map(([key, values]) => {
    const selected = filters[key] || [];
    return {
      [key]: {
        available: compact(values),
        selected: selected.filter((val) => values.includes(val)),
      },
    };
  });

export const AddFilter = ({ updateFilters, activeCollection }) => (
  <DropdownMenuAction
    options={{ items: [{ name: "Category" }, { name: "Status" }] }}
    pinnedActions={[
      {
        name: "Reset Filters",
        action: () => updateFilters(DEFAULT_FILTER_STATE[activeCollection]),
      },
      {
        name: "Clear All Filters",
        action: () => {
          updateFilters({});
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
