import { SortOption } from "@/components/core/sort-button/sort-button";
import { MedicationStatementModel } from "@/fhir/models";

export const medicationSortOptions: SortOption<MedicationStatementModel>[] = [
  {
    display: "Name (A-Z)",
    sorts: [{ key: "display", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    sorts: [{ key: "display", dir: "desc" }],
  },
  {
    display: "Last Fill Date (Oldest to Newest)",
    sorts: [{ key: "lastFillDate", dir: "desc", isDate: true }],
  },
  {
    display: "Last Fill Date (Newest to Oldest)",
    sorts: [{ key: "lastFillDate", dir: "asc", isDate: true }],
  },
  {
    display: "Last Prescribed (Old to New)",
    sorts: [
      { key: "lastPrescribedDate", isDate: true, dir: "desc" },
      { key: "lastPrescriber", dir: "asc" },
    ],
  },
  {
    display: "Last Prescribed (New to Old)",
    sorts: [
      { key: "lastPrescribedDate", isDate: true, dir: "asc" },
      { key: "lastPrescriber", dir: "asc" },
    ],
  },
];

export const defaultMedicationSort = medicationSortOptions[0];
