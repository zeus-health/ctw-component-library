import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { SortOption } from "@/components/core/sort-button/sort-button";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { compact, uniq } from "@/utils/nodash/fp";

export const defaultTimelineSort: SortOption<TimelineEventModel> = {
  display: "Date (New to Old)",
  sorts: [{ key: "date", dir: "desc", isDate: true }],
};

export function timelineFilters(
  timelineEvents: TimelineEventModel[]
): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "type",
    type: "checkbox",
    icon: faClipboardCheck,
    display: "Type",
    values: compact(uniq(timelineEvents.map((te) => te.type))),
  });

  return filters;
}

export const defaultTimelineFilters: FilterChangeEvent = {
  type: {
    key: "type",
    selected: [
      "Medication Fill",
      "Prescription",
      "Encounter",
      "Diagnostic Report",
    ],
    type: "checkbox",
  },
};

export const timelineSortOptions: SortOption<TimelineEventModel>[] = [
  defaultTimelineSort,
  {
    display: "Date (Old to New)",
    sorts: [{ key: "date", dir: "asc", isDate: true }],
  },
];
