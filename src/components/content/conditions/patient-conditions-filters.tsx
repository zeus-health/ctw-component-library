import { PlusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { ConditionModel } from "@/fhir/models";
import { DisplayStatus } from "@/fhir/models/condition";
import { compact, uniq } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";
export type ConditionFilters = {
  status?: DisplayStatus[];
  ccsChapter?: string[];
};
export type Filters = {
  activeCollection: FilterCollection;
  patient?: ConditionFilters;
  other?: ConditionFilters;
};

export type AvailableFilters = {
  [key: string]: {
    available: string[];
    selected: string[];
  };
}[];

const DEFAULT_FILTER_STATE: Omit<Filters, "activeCollection"> = {
  patient: {
    status: ["Active", "Pending", "Unknown"],
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
    setFilters(() => ({
      ...filters,
      [filters.activeCollection]: {
        ...newFilters,
      },
    }));
  }

  function updateCollection(newFilters: Partial<Filters>) {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }));
  }

  useEffect(() => {});

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      filters.activeCollection === "patient"
        ? patientConditions
        : otherConditions;

    // Filter out any filters from our filter list that aren't in the data.
    const conditionFilters: ConditionFilters = {};
    const activeTab = filters[filters.activeCollection];
    Object.entries(availableConditionFilters(conditions)).forEach(
      ([key, values]) => {
        conditionFilters[key] = compact(values).filter((val) =>
          activeTab && activeTab[key as keyof ConditionFilters]
            ? (activeTab[key as keyof ConditionFilters] || []).includes(val)
            : false
        );
      }
    );

    return conditions.filter((c) => {
      const statusFilter =
        !conditionFilters.status ||
        conditionFilters.status.length < 1 ||
        conditionFilters.status.includes(c.displayStatus);

      const ccsChapterFilter =
        !conditionFilters.ccsChapter ||
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
  filters: ConditionFilters | undefined
) =>
  Object.entries(availableConditionFilters(conditions)).map(([key, values]) => {
    const selected = filters?.[key as keyof ConditionFilters] || [];
    return {
      [key]: {
        available: compact(values),
        selected: compact(selected).filter((val) =>
          values.includes(val as DisplayStatus)
        ),
      },
    };
  });

type AddFilterProps = {
  updateFilters: (newFilters: Partial<ConditionFilters>) => void;
  activeCollection: FilterCollection;
  filters: ConditionFilters | undefined;
};

export const AddFilter = ({
  updateFilters,
  activeCollection,
  filters,
}: AddFilterProps) => (
  <DropdownMenuAction
    options={{
      items: [
        { key: "ccsChapter", name: "Category" },
        { key: "status", name: "Status" },
      ],
      onItemSelect: (e) => {
        updateFilters({ ...filters, [e.key]: [] });
      },
    }}
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
