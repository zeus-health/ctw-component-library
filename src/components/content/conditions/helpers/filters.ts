import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faClipboardCheck, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import intersectionWith from "lodash/intersectionWith";
import { ConditionViewOptions } from "./views";
import { dismissFilter } from "../../resource/filters";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { ConditionModel } from "@/fhir/models";
import {
  ConditionStatuses,
  conditionStatuses,
  outsideConditionStatuses,
} from "@/fhir/models/condition";
import { uniqueValues } from "@/utils/filters";

export function conditionFilters(
  conditions: ConditionModel[],
  includeDismiss: boolean,
  showAllStatuses: boolean,
  onlyShowOptionsForStatus?: ConditionViewOptions
): FilterItem[] {
  const filters: FilterItem[] = [];
  if (includeDismiss) {
    filters.push(dismissFilter);
  }

  let statusesToShow: ConditionStatuses[] = showAllStatuses
    ? [...conditionStatuses]
    : [...outsideConditionStatuses];

  if (onlyShowOptionsForStatus) {
    switch (onlyShowOptionsForStatus) {
      case "Current":
        statusesToShow = intersectionWith(
          statusesToShow,
          ["Active", "Pending", "Unknown"],
          (a, b) => a === b
        );
        break;
      case "Past":
        statusesToShow = intersectionWith(
          statusesToShow,
          ["Inactive", "Refuted"],
          (a, b) => a === b
        );
        break;
      default:
        break;
    }
  }

  filters.push(
    {
      key: "displayStatus",
      type: "checkbox",
      icon: faClipboardCheck,
      display: "Status",
      // Create new array as these other ones are readonly.
      values: statusesToShow,
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
