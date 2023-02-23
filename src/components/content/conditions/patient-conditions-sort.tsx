import { useState } from "react";
import { FilterCollection } from "./patient-conditions-filters";
import { ConditionModel } from "@/fhir/models";
import { sort } from "@/utils/sort";

export type SortDir = "asc" | "desc";

export type Sort = {
  key: string;
  dir: SortDir;
  display: string;
  isDate?: boolean;
};

const DEFAULT_SORT: Sort = {
  key: "recordedDate",
  dir: "desc",
  display: "Last Updated Date (Newest to Oldest)",
  isDate: true,
};

const DEFAULT_SORTS = {
  patient: {
    ...DEFAULT_SORT,
  },
  other: {
    ...DEFAULT_SORT,
  },
};

export type SortOption<T> = {
  display: string;
  key: keyof T;
  dir: SortDir;
  isDate?: boolean;
};

const SORT_OPTIONS: SortOption<ConditionModel>[] = [
  {
    display: "Name (A-Z)",
    key: "display",
    dir: "asc",
  },
  {
    display: "Name (Z-A)",
    key: "display",
    dir: "desc",
  },
  {
    display: "Category (A-Z)",
    key: "ccsChapter",
    dir: "asc",
  },
  {
    display: "Category (Z-A)",
    key: "ccsChapter",
    dir: "desc",
  },
  {
    display: "Status (A-Z)",
    key: "displayStatus",
    dir: "asc",
  },
  {
    display: "Status (Z-A)",
    key: "displayStatus",
    dir: "desc",
  },
  {
    display: "Last Updated Date (Oldest to Newest)",
    key: "recordedDate",
    dir: "asc",
    isDate: true,
  },
  {
    display: "Last Updated Date (Newest to Oldest)",
    key: "recordedDate",
    dir: "desc",
    isDate: true,
  },
];

export function useConditionSorts(activeCollection: FilterCollection) {
  const [sorts, setSorts] = useState(DEFAULT_SORTS);
  console.log("sorts", sorts);

  function updateSorts(newSorts: Partial<Sort>) {
    setSorts({ ...sorts, ...newSorts });
  }

  function applySorts(conditions: ConditionModel[]) {
    const activeSort = sorts[activeCollection];
    return sort(
      conditions,
      (c) => c[activeSort.key as keyof ConditionModel],
      activeSort.dir,
      activeSort.isDate
    );
  }

  return {
    applySorts,
    sortOptions: SORT_OPTIONS,
    updateSorts,
    currentSorts: sorts,
  };
}
