import type { FilterItem } from "./filter-bar-types";
import { FilterChangeEvent, FilterValuesRecord } from "./filter-bar-types";
import { ListBoxOptionStatus } from "../list-box/list-box";
import { isFunction, set } from "@/utils/nodash/fp";

export function displayFilterItem({ display }: FilterItem, status: ListBoxOptionStatus) {
  return <>{isFunction(display) ? display(status) : display}</>;
}

// Create onChange event from current <FilterBar /> state
export function filterChangeEvent(
  filters: FilterItem[],
  activeFilterKeys: string[],
  activeFilterValues: FilterValuesRecord
): FilterChangeEvent {
  return activeFilterKeys.reduce((acc, key) => {
    const filter = filters.find((item) => item.key === key) as FilterItem;
    return {
      ...acc,
      [filter.key]: {
        key: filter.key,
        type: filter.type,
        selected: filter.type === "tag" ? true : activeFilterValues[filter.key],
      },
    };
  }, {});
}

// Convert a FilterChangeEvent into FilterValuesRecord (setting default state)
export function filterChangeEventToValuesRecord(state: FilterChangeEvent): FilterValuesRecord {
  return Object.keys(state).reduce((acc, key) => {
    const filterState = state[key];
    if (typeof filterState !== "undefined") {
      const { type } = filterState;
      if (type === "tag") {
        return set(key, [], acc);
      }
      return set(key, filterState.selected, acc);
    }
    return acc;
  }, {});
}
