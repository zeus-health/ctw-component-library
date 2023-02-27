import { useCallback, useState } from "react";
import {
  FilterChangeEvent,
  FilterItem,
} from "@/components/core/filter-bar/filter-bar-types";
import { MedicationStatementModel } from "@/fhir/models";
import { compact, isArray } from "@/utils/nodash";
import { set, uniq } from "@/utils/nodash/fp";

export type FilterCollection = "patient" | "other";

export type Filters = {
  patient: FilterChangeEvent;
  other: FilterChangeEvent;
};

const DEFAULT_FILTERS: Filters = {
  patient: {},
  other: {},
};

export function useMedicationFilters(collection: FilterCollection) {
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
  });

  function updateFilters(newFilters: Partial<FilterChangeEvent>) {
    setFilters(set([collection], newFilters, filters));
  }

  function availableFilters(
    medications: MedicationStatementModel[]
  ): FilterItem[] {
    const prescriberNames = uniq(
      medications
        .map((medication) => medication.lastPrescriber)
        .filter((s) => typeof s === "string")
    ) as string[];

    return compact([
      {
        key: "isArchived",
        type: "tag",
        icon: "eye",
        display: ({ active }) =>
          active ? "dismissed records" : "show dismissed records",
      },
      prescriberNames.length < 2
        ? null
        : {
            key: "lastPrescriber",
            type: "checkbox",
            icon: "clipboard",
            values: prescriberNames,
            display: "prescriber",
          },
    ]);
  }

  const applyFilters = useCallback(
    (medications: MedicationStatementModel[]) =>
      medications.filter((medication) =>
        Object.entries(filters[collection]).every(([_, filterItem]) => {
          const filterKey = filterItem?.key as keyof MedicationStatementModel;
          if (filterItem?.type === "checkbox" && isArray(filterItem.selected)) {
            const completeList = uniq(
              compact(medications.map((c) => c[filterKey]))
            );
            const filteredList = filterItem.selected.filter((item) =>
              completeList.includes(item)
            );

            return (
              filteredList.length < 1 ||
              filteredList.includes(String(medication[filterKey]))
            );
          }
          return true;
        })
      ),
    [collection, filters]
  );

  return {
    filters,
    updateFilters,
    applyFilters,
    availableFilters,
  };
}
