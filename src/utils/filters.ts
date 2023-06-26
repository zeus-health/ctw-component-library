import { Filter } from "@/components/core/filter-bar/filter-bar-types";
import { compact, isArray, uniq } from "@/utils/nodash/";

export type FilterFunc<T extends object> = (data: T[]) => T[];
export type FilterEntry<T extends object> = Filter | FilterFunc<T>;

export const applyFilters = <T extends object>(data: T[], filters?: (Filter | FilterFunc<T>)[]) => {
  if (!filters) return data;
  const filterFuncs = filters.filter((f) => typeof f === "function") as FilterFunc<T>[];
  const filterItems = filters.filter((f) => typeof f !== "function") as Filter[];

  const filteredData = filterFuncs.reduce((acc, filterFunc) => filterFunc(acc), data);

  return filteredData.filter((entry) =>
    Object.entries(filterItems).every(([_, filterItem]) => {
      const targetFilter = String(entry[filterItem.key as keyof T]);

      switch (filterItem.type) {
        case "checkbox":
          if (isArray(filterItem.selected)) {
            const filteredList = filterItem.selected.filter((item) =>
              compact(uniq(data.map((c) => c[filterItem.key as keyof T]))).includes(
                item as T[keyof T]
              )
            );

            return filteredList.includes(targetFilter);
          }
          break;
        case "select":
          return targetFilter === filterItem.selected;
        case "tag":
        default:
      }
      return true;
    })
  );
};

export function uniqueValues<T extends object>(data: T[], key: keyof T): string[] {
  return compact(uniq(data.map((d) => String(d[key]))));
}
