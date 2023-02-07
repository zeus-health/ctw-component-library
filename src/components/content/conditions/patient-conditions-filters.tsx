import { useState } from "react";
import { ConditionModel } from "@/fhir/models";
import { cloneDeep, merge } from "@/utils/nodash";

export type FilterCollection = "patient" | "other";

export type Filters = {
  collection: FilterCollection;
};

// const [filters, setFilters] = useState<FilterChangeEvent>({});
// const filterItems: FilterItem[] = [
//   {
//     key: "status",
//     type: "checkbox",
//     icon: "eye",
//     display: ({ active }) =>
//       active ? "dismissed records" : "show dismissed records",
//     values: [],
//   },
// ];

export function useConditionFilters() {
  const [collection, setCollection] = useState<FilterCollection>("patient");
  const [filters, setFilters] = useState<Filters>({
    collection: "patient",
  });

  function updateFilters(newFilters: Partial<Filters>) {
    setFilters(merge(cloneDeep(filters), newFilters));
  }

  function applyFilters(
    patientConditions: ConditionModel[],
    otherConditions: ConditionModel[]
  ) {
    const conditions =
      filters.collection === "patient" ? patientConditions : otherConditions;
    return conditions.filter((c) =>
      ["Active", "Pending"].includes(c.displayStatus)
    );
  }

  return { filters, updateFilters, applyFilters };
}
