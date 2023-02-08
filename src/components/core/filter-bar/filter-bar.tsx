import type {
  FilterBarProps,
  FilterItem,
  FilterValuesRecord,
} from "@/components/core/filter-bar/filter-bar-types";
import cx from "classnames";
import { useEffect, useState } from "react";
import {
  displayFilterItem,
  filterChangeEvent,
  filterChangeEventToValuesRecord,
  getIcon,
} from "./filter-bar-utils";
import { FilterBarPill } from "@/components/core/filter-bar/filter-bar-pills";
import { ListBox } from "@/components/core/list-box/list-box";
import { omit, partition, uniq } from "@/utils/nodash/fp";

const INTERNAL_KEYS = ["_reset", "_clear"];
const removeInternalKeys = (keys: string[]) =>
  keys.filter((key) => !INTERNAL_KEYS.includes(key));

/**
 * FilterBar - A configurable filter bar with base menu and pills to control
 * which filters are active.
 *
 * Use the defaultState param to pre-set filters on mount.
 *
 * example:
 * ```
 * <FilterBar
 *   defaultState={{
 *     "furry-things": {
 *       type: "checkbox",
 *       selected: ["cats", "dogs", "dice"],
 *     },
 *    "who-called-shotgun": {
 *       type: "select",
 *       selected: "Kristen",
 *     },
 *     dismissed: {
 *       type: "tag",
 *       selected: true,
 *     },
 *   }}
 *   filters={filters}
 *   handleOnChange={handleOnChange}
 * />
 * ```
 */
export const FilterBar = <T extends FilterItem>({
  className,
  handleOnChange,
  filters,
  defaultState = {},
}: FilterBarProps<T>) => {
  const [activeFilterKeys, setActiveFilterKeys] = useState<string[]>(
    Object.keys(defaultState)
  );
  const [activeFilterValues, setActiveFilterValues] =
    useState<FilterValuesRecord>(filterChangeEventToValuesRecord(defaultState));

  // Split the filters up by which are active (selected) or inactive (main menu)
  const [activeFilters, inactiveFilters] = partition(
    ({ key }) => activeFilterKeys.includes(key),
    filters
  );

  useEffect(() => {
    console.log("filters", filters);
    // Validating that the "_clear" filter is never passed in from parent
    if (filters.some(({ key }) => INTERNAL_KEYS.includes(key))) {
      throw new Error(
        `Filters should not use keys ${INTERNAL_KEYS.join(", ")}`
      );
    }
  }, [filters]);

  const clearAllFilters = () => {
    setActiveFilterKeys([]);
    setActiveFilterValues({});
    handleOnChange({});
  };

  // Add or remove a filter from the activated filters list
  const addOrRemoveFilter = (key: string, remove = false) => {
    const updatedKeys = removeInternalKeys(
      remove
        ? activeFilterKeys.filter((k) => k !== key)
        : uniq(activeFilterKeys.concat(key))
    );

    setActiveFilterKeys(updatedKeys);

    let updatedActiveFilterValues;
    if (remove && key in activeFilterValues) {
      // Remove the filter from our active filter values cache
      updatedActiveFilterValues = omit(key, activeFilterValues);
      setActiveFilterValues(updatedActiveFilterValues);
    }
    if (!(remove || key in activeFilterValues)) {
      // Add the filter key to our active filter values cache
      updatedActiveFilterValues = { ...activeFilterValues, [key]: [] };
      setActiveFilterValues(updatedActiveFilterValues);
    }
    // Finally we fire off a change event
    handleOnChange(filterChangeEvent(filters, updatedKeys, activeFilterValues));
  };

  // The update function for checkbox and select pills to call on change
  const updateSelectedFilter = (
    key: string,
    valueKey: string,
    isSelected: boolean
  ) => {
    let activeValues;
    const filter = filters.find((item) => item.key === key);
    const values = activeFilterValues[key];
    if (isSelected) {
      activeValues = {
        ...activeFilterValues,
        [key]:
          filter?.type === "checkbox"
            ? uniq(values.concat(valueKey))
            : valueKey,
      };
    } else if (Array.isArray(values)) {
      activeValues = {
        ...activeFilterValues,
        [key]: values.filter((k) => k !== valueKey),
      };
    } else {
      // Edge case, if not selected and values not array, just remove key
      activeValues = omit(key, activeFilterValues);
    }
    setActiveFilterValues(activeValues);
    handleOnChange(filterChangeEvent(filters, activeFilterKeys, activeValues));
  };

  // Creates the main filter list dropdown
  const inactiveFilterMenuItems = [
    ...inactiveFilters.map((filter) => ({
      display: () => displayFilterItem(filter, { active: false }),
      key: filter.key,
      className: cx("ctw-capitalize", filter.className),
    })),
    {
      display: "clear all filters",
      key: "_clear",
      icon: "trash",
      className:
        "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light",
    },
  ];

  return (
    <div className={cx(className, "ctw-flex ctw-items-center")}>
      <div className="ctw-relative ctw-flex">
        {activeFilters.map((filter) => (
          <FilterBarPill
            key={filter.key}
            filter={filter}
            filterValues={activeFilterValues}
            addOrRemoveFilter={addOrRemoveFilter}
            updateSelectedFilterValues={(
              valueKey: string,
              isSelected: boolean
            ) => updateSelectedFilter(filter.key, valueKey, isSelected)}
          />
        ))}
      </div>

      <ListBox
        useBasicStyles
        btnClassName="ctw-capitalize ctw-bg-transparent ctw-rounded ctw-text-content-light ctw-my-2 ctw-py-2 ctw-px-3 ctw-flex"
        optionsClassName="ctw-capitalize"
        items={inactiveFilterMenuItems}
        onChange={(index, item) => {
          if (item.key === "_clear") {
            clearAllFilters();
          } else {
            addOrRemoveFilter(item.key, false);
          }
        }}
      >
        {getIcon("plus")} Add Filters
      </ListBox>
    </div>
  );
};
