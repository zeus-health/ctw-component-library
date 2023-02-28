import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function conditionFilters(conditions: ConditionModel[]): FilterItem[] {
  return [
    {
      key: "displayStatus",
      type: "checkbox",
      icon: "eye",
      display: "Status",
      values: uniqueValues(conditions, "displayStatus"),
    },
    {
      key: "ccsChapter",
      type: "checkbox",
      icon: "eye",
      display: "Category",
      values: uniqueValues(conditions, "ccsChapter"),
    },
  ];
}

export const defaultConditionFilters: FilterChangeEvent = {
  displayStatus: {
    key: "displayStatus",
    selected: ["Active", "Pending", "Unknown"],
    type: "checkbox",
  },
};
