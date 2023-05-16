import { faCalendarWeek, faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";

export function patientHistoryFilters(): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push(
    {
      key: "status",
      type: "select",
      icon: faHourglass,
      values: [
        "initialize",
        {
          key: "in_progress",
          name: "in progress",
        },
        "error",
        "done",
        {
          key: "done_with_errors",
          name: "done with errors ",
        },
      ],
      display: "status",
    },
    {
      key: "future_jobs",
      type: "tag",
      icon: faCalendarWeek,
      display: "Exclude Future Jobs",
    }
  );

  return filters;
}

export const defaultPatientHistoryFilters: FilterChangeEvent = {
  future_jobs: {
    key: "future_jobs",
    selected: true,
    type: "tag",
  },
};
