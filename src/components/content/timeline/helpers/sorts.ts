import { SortOption } from "@/components/core/sort-button/sort-button";
import { TimelineEventModel } from "@/fhir/models/timeline-event";

export const defaultTimelineSort: SortOption<TimelineEventModel> = {
  display: "Date (New to Old)",
  sorts: [{ key: "date", dir: "desc", isDate: true }],
};

export const timelineSortOptions: SortOption<TimelineEventModel>[] = [
  defaultTimelineSort,
  {
    display: "Date (Old to New)",
    sorts: [{ key: "date", dir: "asc", isDate: true }],
  },
];
