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

  const [activeFilters, inactiveFilters] = partition(
    ({ key }) => activeFilterKeys.includes(key),
    filters
  );

  useEffect(() => {
    // Validating that the "_reset" filter is never passed in from parent
    if (filters.map(({ key }) => key).includes("_reset")) {
      throw new Error("FilterBar filters should not have key name '_reset'");
    }
  }, [filters]);

  const removeInternalKeys = (keys: string[]) =>
    keys.filter((key) => !["_reset", "_clear"].includes(key));

  const resetAllFilters = () => {
    setActiveFilterKeys([]);
    setActiveFilterValues({});
    handleOnChange({});
  };

  // Add or remove a filter from the activated filters list
  const addRemoveFilter = (key: string, remove = false) => {
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

    handleOnChange(filterChangeEvent(filters, updatedKeys, activeFilterValues));
  };

  // Update selected values for dropdown style filters
  const updateValuesForFilter = (
    key: string,
    valueKey: string,
    isSelected: boolean
  ) => {
    const filter = filters.find((item) => item.key === key);
    const values = activeFilterValues[key];
    let activeValues;
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
      key: "_reset",
      icon: "trash",
      className:
        "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light",
    },
  ];

  return (
    <div className="ctw-flex ctw-items-center">
      <div className={cx(className, "ctw-relative ctw-flex")}>
        {activeFilters.map((filter) => (
          <FilterBarPill
            key={filter.key}
            filter={filter}
            filterValues={activeFilterValues}
            addRemoveFilter={addRemoveFilter}
            updateSelectedFilterValues={(
              valueKey: string,
              isSelected: boolean
            ) => updateValuesForFilter(filter.key, valueKey, isSelected)}
          />
        ))}
      </div>

      <ListBox
        useBasicStyles
        btnClassName="ctw-bg-transparent ctw-rounded ctw-text-content-light ctw-my-2 ctw-py-2 ctw-px-3 ctw-flex"
        items={inactiveFilterMenuItems}
        onChange={(index, item) => {
          if (item.key === "_reset") {
            resetAllFilters();
          } else {
            addRemoveFilter(item.key, false);
          }
        }}
      >
        {getIcon("plus")} Add Filters
      </ListBox>
    </div>
  );
};
