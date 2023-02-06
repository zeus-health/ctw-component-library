import type { FilterItem, FilterValuesRecord } from "./filter-bar-types";
import { FilterBarCheckboxPill } from "./filter-bar-pills/checkbox-pill";
import { FilterBarSelectPill } from "./filter-bar-pills/select-pill";
import { FilterBarTagPill } from "./filter-bar-pills/tag-pill";

type FilterBarPillProps = {
  addOrRemoveFilter: (key: string, remove: boolean) => void;
  filter: FilterItem;
  filterValues: FilterValuesRecord;
  updateSelectedFilterValues: (valueKey: string, isSelected: boolean) => void;
};

/**
 * Filter pill component that can render any pill type. It abstracts the various
 * pill types (located in ./filter-bar-pills folder). In practice this component
 * will only be used by the FilterBar component.
 */
export function FilterBarPill({
  addOrRemoveFilter,
  filter,
  filterValues,
  updateSelectedFilterValues,
}: FilterBarPillProps) {
  const onRemove = () => addOrRemoveFilter(filter.key, true);
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
