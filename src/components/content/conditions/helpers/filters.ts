import {
  faClipboardCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function conditionFilters(
  conditions: ConditionModel[],
  outside: boolean
): FilterItem[] {
  return [
    {
      key: "displayStatus",
      type: "checkbox",
      icon: faClipboardCheck,
      display: "Status",
      values: outside
        ? ["Active", "Inactive", "Unknown"]
        : [
            "Active",
            "Inactive",
            "Entered in Error",
            "Pending",
            "Refuted",
            "Unknown",
          ],
    },
    {
      key: "ccsChapter",
      type: "checkbox",
      icon: faClipboardList,
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
