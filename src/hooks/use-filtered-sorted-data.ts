import { useEffect, useState } from "react";
import { ViewOption } from "@/components/content/resource/helpers/view-button";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { SortOption } from "@/components/core/sort-button/sort-button";
import { applyFilters } from "@/utils/filters";
import { compact } from "@/utils/nodash";
import { applySorts } from "@/utils/sort";

export type UseFilteredSortedDataProps<T extends object> = {
  records?: T[];
  defaultSort?: SortOption<T>;
  defaultFilters?: FilterChangeEvent;
  defaultView?: ViewOption<T>;
};

export function useFilteredSortedData<T extends object>({
  defaultFilters = {},
  defaultSort,
  defaultView,
  records
}: UseFilteredSortedDataProps<T>) {
  const [viewOption, setViewOption] = useState(defaultView);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState(defaultSort);
  const [data, setData] = useState(records ?? []);

  useEffect(() => {
    const filteredData = applyFilters(records ?? [], [
      ...compact(Object.values(filters)),
      ...(viewOption?.filters ?? [])
    ]);
    const filteredAndSortedData =
      defaultSort && sortOption ? applySorts(filteredData, sortOption.sorts) : filteredData;
    setData(filteredAndSortedData);
  }, [filters, sortOption, records, viewOption, defaultSort]);

  return {
    setFilters,
    setSort: setSortOption,
    viewOption,
    setViewOption,
    data,
    filters,
    sortOption
  };
}
