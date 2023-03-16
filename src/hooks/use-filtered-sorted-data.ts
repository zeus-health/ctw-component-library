import { useEffect, useState } from "react";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { SortOption } from "@/components/core/sort-button/sort-button";
import { applyFilters } from "@/utils/filters";
import { applySorts } from "@/utils/sort";

export type UseFilteredSortedDataProps<T extends object> = {
  records?: T[];
  defaultSort: SortOption<T>;
  defaultFilters?: FilterChangeEvent;
};

export function useFilteredSortedData<T extends object>({
  defaultFilters = {},
  defaultSort,
  records,
}: UseFilteredSortedDataProps<T>) {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState(defaultSort);
  const [data, setData] = useState(records ?? []);

  useEffect(() => {
    const filteredData = applyFilters(records ?? [], filters);
    const filteredAndSortedData = applySorts(filteredData, sortOption.sorts);
    setData(filteredAndSortedData);
  }, [filters, sortOption, records]);

  return { setFilters, setSort: setSortOption, data, filters, sortOption };
}
