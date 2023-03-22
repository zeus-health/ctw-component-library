import {
  faClipboardCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { dismissFilter } from "../../resource/filters";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import {
  conditionStatuses,
  outsideConditionStatuses,
} from "@/fhir/models/condition";
import { uniqueValues } from "@/utils/filters";

export function conditionFilters(
  conditions: ConditionModel[],
  outside: boolean
): FilterItem[] {
  const filters: FilterItem[] = [];

  if (outside) {
    filters.push(dismissFilter);
  }

  filters.push(
    {
      key: "displayStatus",
      type: "checkbox",
      icon: faClipboardCheck,
      display: "Status",
      // Create new array as these other ones are readonly.
      values: [...(outside ? outsideConditionStatuses : conditionStatuses)],
    },
    {
      key: "ccsChapter",
      type: "checkbox",
      icon: faClipboardList,
      display: "Category",
      values: uniqueValues(conditions, "ccsChapter"),
    }
  );

  return filters;
}

export const defaultConditionFilters: FilterChangeEvent = {
  displayStatus: {
    key: "displayStatus",
    selected: ["Active", "Pending", "Unknown"],
    type: "checkbox",
  },
};
