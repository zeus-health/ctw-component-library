import type { FilterItem, FilterValuesRecord } from "./filter-bar-types";
import { FilterBarCheckboxPill } from "./filter-bar-pills/checkbox-pill";
import { FilterBarSelectPill } from "./filter-bar-pills/select-pill";
import { FilterBarTagPill } from "./filter-bar-pills/tag-pill";

type FilterBarPillProps = {
  onRemove: (key: string) => void;
  filter: FilterItem;
  filterValues: FilterValuesRecord;
  isOpen: boolean;
  updateSelectedFilterValues: (valueKey: string, isSelected: boolean) => void;
};

/**
 * Filter pill component that can render any pill type. It abstracts the various
 * pill types (located in ./filter-bar-pills folder). In practice this component
 * will only be used by the FilterBar component.
 */
export function FilterBarPill({
  onRemove,
  filter,
  filterValues,
  isOpen,
  updateSelectedFilterValues,
}: FilterBarPillProps) {
  const handleRemove = () => onRemove(filter.key);
  switch (filter.type) {
    case "tag":
      return <FilterBarTagPill filter={filter} onRemove={handleRemove} />;
    case "select":
      return (
        <FilterBarSelectPill
          filter={filter}
          onRemove={handleRemove}
          onChange={updateSelectedFilterValues}
        />
      );
    case "checkbox":
      return (
        <FilterBarCheckboxPill
          isOpen={isOpen}
          filter={filter}
          filterValues={filterValues}
          onRemove={handleRemove}
          onChange={updateSelectedFilterValues}
        />
      );
    default:
      throw new Error("ActiveFilterItem has invalid filter type");
  }
}
