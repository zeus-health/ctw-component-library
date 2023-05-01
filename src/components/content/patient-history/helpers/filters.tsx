import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";

export function patientHistoryFilters(): FilterItem[] {
  const filters: FilterItem[] = [];

  filters.push({
    key: "status",
    type: "select",
    icon: faUser,
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
  });

  return filters;
}
