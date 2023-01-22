import { PlusIcon } from "@heroicons/react/outline";
import { cloneDeep, merge } from "lodash";
import { useState } from "react";
import { DropdownMenu } from "@/components/core/dropdown-menu";
import { ConditionModel } from "@/fhir/models";

export type FilterCollection = "patient" | "other";
export type Status =
  | "Active"
  | "Pending"
  | "Inactive"
  | "Refuted"
  | "Entered in Error";

export type Filters = {
  collection: FilterCollection;
  showHistoric: boolean;
};

export type Filters2 = {
  activeCollection: FilterCollection;
  patientFilters?: { status?: Status[]; ccsChapter?: string[] };
  otherFilters?: { status?: Status[]; ccsChapter?: string[] };
};

export function useConditionFilters() {
  const [filters, setFilters] = useState<Filters2>({
    activeCollection: "patient",
    patientFilters: {
      status: ["Active", "Pending"],
      ccsChapter: ["test"],
    },
    otherFilters: { status: ["Active", "Pending"] },
  });

  function updateFilters(newFilters: Partial<Filters2>) {
    setFilters(merge(cloneDeep(filters), newFilters));
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
      const conditionFilters =
        filters.activeCollection === "patient"
          ? filters.patientFilters
          : filters.otherFilters;

      return conditionFilters?.status?.includes(c.displayStatus as Status);
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

    return { status: conditions.map((c) => c.displayStatus) };
  }

  return { filters, updateFilters, applyFilters, availableFilters };
}

export const AddFilter = () => (
  <DropdownMenu
    menuItems={[{ name: "Category" }, { name: "Status" }]}
    pinnedActions={[
      { name: "Show Inactive Records" },
      { name: "Clear All Filters" },
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
  </DropdownMenu>
);
