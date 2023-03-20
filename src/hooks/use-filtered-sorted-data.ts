import { useEffect, useState } from "react";
import { ViewOption } from "@/components/content/resource/helpers/view-button";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { SortOption } from "@/components/core/sort-button/sort-button";
import { applyFilters } from "@/utils/filters";
import { applySorts } from "@/utils/sort";

export type UseFilteredSortedDataProps<T extends object> = {
  records?: T[];
  defaultSort: SortOption<T>;
  defaultFilters?: FilterChangeEvent;
  defaultView?: ViewOption;
};

export function useFilteredSortedData<T extends object>({
  defaultFilters = {},
  defaultSort,
  defaultView,
  records,
}: UseFilteredSortedDataProps<T>) {
  const [viewOption, setViewOption] = useState(defaultView);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState(defaultSort);
  const [data, setData] = useState(records ?? []);

  useEffect(() => {
    let filteredData = applyFilters(records ?? [], Object.values(filters));
    filteredData = applyFilters(filteredData, viewOption?.filters);
    const filteredAndSortedData = applySorts(filteredData, sortOption.sorts);
    setData(filteredAndSortedData);
  }, [filters, sortOption, records, viewOption]);

  return {
    setFilters,
    setSort: setSortOption,
    setViewOption,
    data,
    filters,
    sortOption,
  };
}
