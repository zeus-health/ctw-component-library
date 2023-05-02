import { Filter } from "@/components/core/filter-bar/filter-bar-types";
import { compact, find, isArray, uniq } from "@/utils/nodash/";

export const applyFilters = <T extends object>(data: T[], filters?: Filter[]) => {
  if (!filters) return data;

  return data.filter((entry) => {
    const showArchived = find(filters, { key: "isArchived" })?.selected;
    const isArchived = Boolean(entry["isArchived" as keyof T]);

    if (!showArchived && isArchived) {
      return false;
    }

    return Object.entries(filters).every(([_, filterItem]) => {
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
    });
  });
};

export function uniqueValues<T extends object>(data: T[], key: keyof T): string[] {
  return compact(uniq(data.map((d) => String(d[key]))));
}