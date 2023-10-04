import { SortOption } from "@/components/core/sort-button/sort-button";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";

export const careTeamSortOptions: SortOption<CareTeamPractitionerModel>[] = [
  {
    display: "Provider (A-Z)",
    sorts: [{ key: "practitionerName", dir: "asc" }],
  },
  {
    display: "Provider (Z-A)",
    sorts: [{ key: "practitionerName", dir: "desc" }],
  },
  {
    display: "Last Updated (Old to New)",
    sorts: [
      { key: "effectiveStartDate", dir: "asc", isDate: true },
      { key: "practitionerName", dir: "asc" },
    ],
  },
  {
    display: "Last Updated (New To Old)",
    sorts: [
      { key: "effectiveStartDate", dir: "desc", isDate: true },
      { key: "practitionerName", dir: "asc" },
    ],
  },
];

export const defaultCareTeamSort = careTeamSortOptions[3];
