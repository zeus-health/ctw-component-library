import { SortOption } from "@/components/core/sort-button/sort-button";
import { DiagnosticReportModel } from "@/fhir/models";

export const diagnosticReportSortOptions: SortOption<DiagnosticReportModel>[] = [
  {
    display: "Date (New to Old)",
    sorts: [{ key: "effectiveStart", dir: "desc", isDate: true }],
  },
  {
    display: "Date (Old to New)",
    sorts: [{ key: "effectiveStart", dir: "asc", isDate: true }],
  },
  {
    display: "Name (A-Z)",
    sorts: [{ key: "displayName", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    sorts: [{ key: "displayName", dir: "desc" }],
  },
];

export const defaultDiagnosticReportSort = diagnosticReportSortOptions[0];
