import type { FilterItem, FilterValuesRecord } from "./filter-bar-types";
import { FilterBarCheckboxPill } from "./filter-bar-pills/checkbox-pill";
import { FilterBarSelectPill } from "./filter-bar-pills/select-pill";
import { FilterBarTagPill } from "./filter-bar-pills/tag-pill";

type FilterBarPillProps = {
  addRemoveFilter: (key: string, remove: boolean) => void;
  filter: FilterItem;
  filterValues: FilterValuesRecord;
  updateSelectedFilterValues: (valueKey: string, isSelected: boolean) => void;
};

export function FilterBarPill({
  addRemoveFilter,
  filter,
  filterValues,
  updateSelectedFilterValues,
}: FilterBarPillProps) {
  const onRemove = () => addRemoveFilter(filter.key, true);
  switch (filter.type) {
    case "tag":
      return <FilterBarTagPill filter={filter} onRemove={onRemove} />;
    case "select":
      return (
        <FilterBarSelectPill
          filter={filter}
          onRemove={onRemove}
          onChange={updateSelectedFilterValues}
        />
      );
    case "checkbox":
      return (
        <FilterBarCheckboxPill
          filter={filter}
          filterValues={filterValues}
          onRemove={onRemove}
          onChange={updateSelectedFilterValues}
        />
      );
    default:
      throw new Error("ActiveFilterItem has invalid filter type");
  }
}
