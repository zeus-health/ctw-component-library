import type {
  FilterBarProps,
  FilterItem,
  FilterValuesRecord,
} from "@/components/core/filter-bar/filter-bar-types";
import { faPlus, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useEffect, useState } from "react";
import {
  filterChangeEvent,
  filterChangeEventToValuesRecord,
} from "./filter-bar-utils";
import { FilterBarPill } from "@/components/core/filter-bar/filter-bar-pills";
import { ListBox, MinListBoxItem } from "@/components/core/list-box/list-box";
import { omit, partition, uniq } from "@/utils/nodash/fp";
import { isEmptyValue } from "@/utils/types";

const INTERNAL_KEYS = ["_remove", "_reset"];
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
 *   onChange={handleOnChange}
 * />
 * ```
 */
export const FilterBar = ({
  className,
  onChange,
  filters,
  defaultState = {},
}: FilterBarProps) => {
  const [recentlyAdded, setRecentlyAdded] = useState<string>();
  const [activeFilterKeys, setActiveFilterKeys] = useState<string[]>(
    Object.keys(defaultState)
  );
  const [activeFilterValues, setActiveFilterValues] =
    useState<FilterValuesRecord>(filterChangeEventToValuesRecord(defaultState));
  const [initialState, _] = useState<FilterValuesRecord>(
    filterChangeEventToValuesRecord(defaultState)
  );

  // Split the filters up by which are active (selected) or inactive (main menu)
  const [activeFilters, inactiveFilters] = partition(
    ({ key }) => activeFilterKeys.includes(key),
    filters
  );

  useEffect(() => {
    // Validating that the "_remove" filter is never passed in from parent
    if (filters.some(({ key }) => INTERNAL_KEYS.includes(key))) {
      throw new Error(
        `Filters should not use keys ${INTERNAL_KEYS.join(", ")}`
      );
    }
  }, [filters]);

  const clearAllFilters = () => {
    setActiveFilterKeys([]);
    setActiveFilterValues({});
    onChange({});
  };

  const resetAllFilters = () => {
    setActiveFilterValues(initialState);
    setActiveFilterKeys(Object.keys(initialState));
    onChange(
      filterChangeEvent(filters, Object.keys(initialState), initialState)
    );
  };

  // Add or remove a filter from the activated filters list
  const addOrRemoveFilter = (key: string, remove = false) => {
    if (!remove) {
      setRecentlyAdded(key);
    }
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
    onChange(filterChangeEvent(filters, updatedKeys, activeFilterValues));
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
    onChange(filterChangeEvent(filters, activeFilterKeys, activeValues));
  };

  const toFilterMenuItem = (filter: FilterItem): MinListBoxItem => ({
    display: filter.display,
    icon: filter.icon,
    key: filter.key,
    className: cx("ctw-capitalize", filter.className),
  });

  const [aboveTheFold, belowTheFold] = partition(
    (filter) => !filter.belowTheFold,
    inactiveFilters
  );

  if (!isEmptyValue(initialState)) {
    belowTheFold.push({
      display: "reset filters",
      icon: faRefresh,
      key: "_reset",
      type: "tag",
    });
  }
  belowTheFold.push({
    display: "remove all filters",
    icon: faTrash,
    key: "_remove",
    type: "tag",
  });

  const menuItems: MinListBoxItem[] = [
    ...aboveTheFold.map(toFilterMenuItem),
    { divider: true },
    ...belowTheFold.map(toFilterMenuItem),
  ];

  return (
    <div
      className={cx(
        className,
        "ctw-relative ctw-flex ctw-items-center ctw-space-x-2"
      )}
    >
      {activeFilters.map((filter) => (
        <FilterBarPill
          isOpen={recentlyAdded === filter.key}
          key={filter.key}
          filter={filter}
          filterValues={activeFilterValues}
          handleAddOrRemoveFilter={addOrRemoveFilter}
          updateSelectedFilterValues={(valueKey: string, isSelected: boolean) =>
            updateSelectedFilter(filter.key, valueKey, isSelected)
          }
        />
      ))}

      <ListBox
        useBasicStyles
        btnClassName="!ctw-text-content-light ctw-btn-clear !ctw-font-normal !ctw-py-2"
        items={menuItems}
        onChange={(_index, item) => {
          switch (item.key) {
            case "_remove":
              return clearAllFilters();
            case "_reset":
              return resetAllFilters();
            default:
              return addOrRemoveFilter(item.key, false);
          }
        }}
      >
        <div className="ctw-space-x-1">
          <FontAwesomeIcon icon={faPlus} className="ctw-w-4" />
          <span>Add Filters</span>
        </div>
      </ListBox>
    </div>
  );
};
