import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { DiagnosticReportModel } from "@/fhir/models";
import { uniqueValues } from "@/utils/filters";

export function diagnosticReportFilters(
  model: DiagnosticReportModel[]
): FilterItem[] {
  return [
    {
      key: "category",
      type: "checkbox",
      icon: "eye",
      display: "Category",
      values: uniqueValues(model, "category"),
    },
  ];
}

export const defaultObservationFilters: FilterChangeEvent = {};
