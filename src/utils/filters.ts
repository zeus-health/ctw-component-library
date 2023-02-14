import { Resource } from "fhir/r4";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { compact, isArray, uniq } from "@/utils/nodash/";

export const applyFilters = <T extends Resource>(
  resources: T[],
  filters: FilterChangeEvent
) =>
  resources.filter((resource) =>
    Object.entries(filters).every(([_, filterItem]) => {
      if (filterItem?.type === "checkbox" && isArray(filterItem.selected)) {
        const filteredList = filterItem.selected.filter((item) =>
          compact(
            uniq(resources.map((c) => c[filterItem.key as keyof T]))
          ).includes(item as T[keyof T])
        );

        const targetFilter = resource[filterItem.key as keyof T];

        return (
          filteredList.length < 1 || filteredList.includes(String(targetFilter))
        );
      }

      return true;
    })
  );
