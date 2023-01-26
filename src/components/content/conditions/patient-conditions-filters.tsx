import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { ConditionModel } from "@/fhir/models";
import { DisplayStatus } from "@/fhir/models/condition";
import { uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";
export type FilterTypes = { status?: DisplayStatus[]; ccsChapter?: string[] };
export type Filters = {
  activeCollection: FilterCollection;
  patient?: FilterTypes;
  other?: FilterTypes;
};

export type FilterActions = {
  removeFilter: (filterName: keyof FilterTypes) => void;
};

export type AvailableFilters = {
  [key: string]: {
    selected: unknown[];
    avalable: unknown[];
  }[];
};

const filterMap = { status: "status", ccsChapter: "category" };
export function useConditionFilters() {
  const [filters, setFilters] = useState<Filters>({
    activeCollection: "patient",
    patient: {
      status: ["Active", "Pending", "Unknown"],
      ccsChapter: ["Mental and Behavioral"],
    },
    other: { status: ["Active", "Pending"] },
  });

  console.log("filters", filters);
  function updateFilters(newFilters: Partial<Filters>) {
    setFilters((prevState) => ({ ...prevState, ...newFilters }));
  }

  const actions = {
    removeFilter: (filterName: keyof FilterTypes) =>
      updateFilters({
        [filters.activeCollection]: { [filterName]: [] },
      }),
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
    return Object.entries(
      availableFilters(patientConditions, otherConditions)
    ).map(([key, values]) => {
      const selected = filters[filters.activeCollection][key] || [];
      return {
        [filterMap[key as keyof typeof filterMap]]: {
          available: values,
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
      cssChapter: uniq(conditions.map((c) => c.ccsChapter)),
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

export const AddFilter = ({ updateFilters }) => (
  <DropdownMenuAction
    menuItems={[{ name: "Category" }, { name: "Status" }]}
    pinnedActions={[
      { name: "Reset Filters", action: () => {} },
      {
        name: "Clear All Filters",
        action: () => {
          updateFilters({ patient: {}, other: {} });
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
