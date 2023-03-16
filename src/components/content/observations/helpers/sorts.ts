import { SortOption } from "@/components/core/sort-button/sort-button";
import { DiagnosticReportModel } from "@/fhir/models";

export const defaultObservationSort: SortOption<DiagnosticReportModel> = {
  display: "Effective Date (New to Old)",
  sorts: [{ key: "effectiveStart", dir: "desc", isDate: true }],
};

export const observationSortOptions: SortOption<DiagnosticReportModel>[] = [
  {
    display: "Name (A-Z)",
    sorts: [{ key: "displayName", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    sorts: [{ key: "displayName", dir: "desc" }],
  },
  {
    display: "Effective Date (Old to New)",
    sorts: [{ key: "effectiveStart", dir: "asc", isDate: true }],
  },
  defaultObservationSort,
];
