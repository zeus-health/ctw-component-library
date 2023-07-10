import { SortOption } from "@/components/core/sort-button/sort-button";
import { DocumentModel } from "@/fhir/models/document";

export const documentSortOptions: SortOption<DocumentModel>[] = [
  {
    display: "Name (A-Z)",
    sorts: [{ key: "title", dir: "asc" }],
  },
  {
    display: "Name (Z-A)",
    sorts: [{ key: "title", dir: "desc" }],
  },
  {
    display: "Date (Old to New)",
    sorts: [
      { key: "dateForSort", dir: "asc", isDate: true },
      { key: "title", dir: "asc" },
    ],
  },
  {
    display: "Date (New To Old)",
    sorts: [
      { key: "dateForSort", dir: "desc", isDate: true },
      { key: "title", dir: "asc" },
    ],
  },
];

export const defaultDocumentSort = documentSortOptions[3];
