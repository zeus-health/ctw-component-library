import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { compact, isArray, uniq } from "@/utils/nodash/";

export const applyFilters = <T extends object>(
  data: T[],
  filters: FilterChangeEvent
) =>
  data.filter((entry) =>
    Object.entries(filters).every(([_, filterItem]) => {
      if (filterItem?.type === "checkbox" && isArray(filterItem.selected)) {
        const filteredList = filterItem.selected.filter((item) =>
          compact(uniq(data.map((c) => c[filterItem.key as keyof T]))).includes(
            item as T[keyof T]
          )
        );

        const targetFilter = entry[filterItem.key as keyof T];

        return (
          filteredList.length < 1 || filteredList.includes(String(targetFilter))
        );
      }

      return true;
    })
  );

export function uniqueValues<T extends object>(
  data: T[],
  key: keyof T
): string[] {
  return compact(uniq(data.map((d) => String(d[key]))));
}
