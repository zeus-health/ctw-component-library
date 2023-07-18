import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faClipboardCheck, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { dismissFilter } from "../../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import { conditionStatuses, outsideConditionStatuses } from "@/fhir/models/condition";
import { uniqueValues } from "@/utils/filters";

export function conditionFilters(
  conditions: ConditionModel[],
  includeDismiss: boolean,
  showAllStatuses: boolean
): FilterItem[] {
  const filters: FilterItem[] = [];

  if (includeDismiss) {
    filters.push(dismissFilter);
  }

  filters.push(
    {
      key: "displayStatus",
      type: "checkbox",
      icon: faClipboardCheck,
      display: "Status",
      // Create new array as these other ones are readonly.
      values: [...(showAllStatuses ? conditionStatuses : outsideConditionStatuses)],
    },
    {
      key: "ccsChapter",
      type: "checkbox",
      icon: faClipboardList,
      display: "Category",
      values: uniqueValues(conditions, "ccsChapter"),
    },
    {
      key: "type",
      type: "checkbox",
      icon: faClock,
      display: "Type",
      values: uniqueValues(conditions, "type"),
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
