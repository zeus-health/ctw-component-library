import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { DiagnosticReportModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function filters(model: DiagnosticReportModel[]): FilterItem[] {
  return [
    {
      key: "category",
      type: "checkbox",
      icon: faEye,
      display: "Category",
      values: uniqueValues(model, "category"),
    },
  ];
}

export const defaultFilters: FilterChangeEvent = {};
