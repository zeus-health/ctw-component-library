import { dismissFilter } from "../../resource/filters";
import { FilterChangeEvent, FilterItem } from "@/components/core/filter-bar/filter-bar-types";

export function diagnosticReportFilter(): FilterItem[] {
  const filters: FilterItem[] = [dismissFilter];
  return filters;
}

export const defaultDiagnosticReportFilters: FilterChangeEvent = {};
