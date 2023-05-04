import { SortOption } from "@/components/core/sort-button/sort-button";
import { ConditionModel } from "@/fhir/models";

export const defaultConditionSort: SortOption<ConditionModel> = {
  display: "Last Updated (New to Old)",
  sorts: [{ key: "recordedDate", dir: "desc", isDate: true }],
};

export const conditionSortOptions: SortOption<ConditionModel>[] = [
  {
    display: "Name (A-Z)",
    sorts: [{ key: "display", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    sorts: [{ key: "display", dir: "desc" }],
  },
  {
    display: "Category (A-Z)",
    sorts: [{ key: "ccsChapter", dir: "asc" }],
  },
  {
    display: "Category (Z-A)",
    sorts: [{ key: "ccsChapter", dir: "desc" }],
  },
  {
    display: "Status (A-Z)",
    sorts: [{ key: "displayStatus", dir: "asc" }],
  },
  {
    display: "Status (Z-A)",
    sorts: [{ key: "displayStatus", dir: "desc" }],
  },
  {
    display: "Last Updated (Old to New)",
    sorts: [{ key: "recordedDate", dir: "asc", isDate: true }],
  },
  defaultConditionSort,
];