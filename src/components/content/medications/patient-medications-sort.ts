import { useState } from "react";
import { SortOption } from "@/components/core/sort-button/sort-button";
import { sortByIndices } from "@/components/core/table/table-helpers";
import { MedicationStatementModel } from "@/fhir/models";

const SORT_OPTIONS: SortOption<MedicationStatementModel>[] = [
  {
    display: "Name (A-Z)",
    key: "display",
    sortIndices: [{ index: "display", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    key: "display",
    sortIndices: [{ index: "display", dir: "desc" }],
  },
  {
    display: "Status (A-Z)",
    key: "status",
    sortIndices: [
      { index: "status", dir: "asc" },
      { index: "dateAsserted", dir: "desc" },
    ],
  },
  {
    display: "Status (Z-A)",
    key: "status",
    sortIndices: [
      { index: "status", dir: "desc" },
      { index: "dateAsserted", dir: "desc" },
    ],
  },
  {
    display: "Last Fill Date (Oldest to Newest)",
    key: "lastFillDate",
    sortIndices: [{ index: "lastFillDate", dir: "desc", isDate: true }],
  },
  {
    display: "Last Fill Date (Newest to Oldest)",
    key: "lastFillDate",
    sortIndices: [{ index: "lastFillDate", dir: "asc", isDate: true }],
  },
  {
    display: "Last Prescribed Date (Oldest to Newest)",
    key: "lastPrescribedDate",
    sortIndices: [
      { index: "lastPrescribedDate", isDate: true, dir: "desc" },
      { index: "lastPrescriber", dir: "asc" },
    ],
  },
  {
    display: "Last Prescribed Date (Newest to Oldest)",
    key: "lastPrescribedDate",
    sortIndices: [
      { index: "lastPrescribedDate", isDate: true, dir: "asc" },
      { index: "lastPrescriber", dir: "asc" },
    ],
  },
];

export function useMedicationSorts() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0]);

  function updateSorts(option: SortOption<MedicationStatementModel>) {
    setActiveSort(option);
  }

  function applySorts(records: MedicationStatementModel[]) {
    return sortByIndices(records, activeSort.sortIndices);
  }

  return {
    applySorts,
    sortOptions: SORT_OPTIONS,
    updateSorts,
    currentSorts: activeSort,
  };
}
