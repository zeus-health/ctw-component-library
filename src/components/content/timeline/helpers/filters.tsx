import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { compact, isEqual, uniqWith } from "@/utils/nodash/fp";

export function timelineFilters(timelineEvents: TimelineEventModel[]): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "type",
    type: "checkbox",
    icon: faClipboardCheck,
    display: "Type",
    values: compact(
      uniqWith(
        isEqual,
        timelineEvents.map((te) =>
          te.type
            ? {
                key: te.type,
                name: te.type,
              }
            : undefined
        )
      )
    ),
  });

  return filters;
}

export const defaultTimelineFilters: FilterChangeEvent = {
  type: {
    key: "type",
    selected: ["Diagnostic Report", "Encounter"],
    type: "checkbox",
  },
};
