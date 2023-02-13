import type {
  FilterBarProps,
  FilterItem,
  FilterValuesRecord,
} from "@/components/core/filter-bar/filter-bar-types";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import {
  displayFilterItem,
  filterChangeEvent,
  filterChangeEventToValuesRecord,
  getIcon,
} from "./filter-bar-utils";
import { FilterBarPill } from "@/components/core/filter-bar/filter-bar-pills";
import { ListBox } from "@/components/core/list-box/list-box";
import { omit, partition, uniq } from "@/utils/nodash/fp";

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
    handleOnChange({});
  };

  const resetAllFilters = () => {
    setActiveFilterValues(initialState);
    setActiveFilterKeys(Object.keys(initialState));
    handleOnChange(
      filterChangeEvent(filters, Object.keys(initialState), initialState)
    );
  };

  const clearFilter = useCallback(
    (key: string) => {
      setActiveFilterValues({ ...activeFilterValues, [key]: [] });
    },
    [activeFilterValues]
  );

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

  const toFilterMenuItem = (filter: FilterItem) => ({
    display: () => displayFilterItem(filter, { active: false }),
    key: filter.key,
    className: cx("ctw-capitalize", filter.className),
  });

  const [aboveTheFold, belowTheFold] = partition(
    (filter) => !filter.belowTheFold,
    inactiveFilters
  );
  const hasBelowTheFoldItems = belowTheFold.length > 0;
  if (hasBelowTheFoldItems) {
    // We need to add the ccs border top divider to first item under fold
    belowTheFold[0] = {
      ...belowTheFold[0],
      className: cx(
        belowTheFold[0].className,
        "ctw-border-solid ctw-border-divider-light ctw-border-b-0"
      ),
    };
  }
  // Creates the main filter list dropdown
  const inactiveFilterMenuItems = [
    ...aboveTheFold.map(toFilterMenuItem),
    // Need to add class for the first menu item under the fold
    ...belowTheFold.slice(0, 1).map(toFilterMenuItem),
    ...belowTheFold.slice(1).map(toFilterMenuItem),

    {
      // eslint-disable-next-line react/no-unstable-nested-components
      display: () => <>{getIcon("trash")} remove all filters</>,
      key: "_remove",
      icon: "trash",
      className: cx("ctw-capitalize"),
    },
  ];

  if (activeFilters.filter((filter) => filter.type !== "tag").length > 0) {
    inactiveFilterMenuItems.splice(-1, 0, {
      // eslint-disable-next-line react/no-unstable-nested-components
      display: () => <>{getIcon("reset")} reset filters</>,
      key: "_reset",
      icon: "reset",
      className: cx("ctw-capitalize", {
        // This adds divider to this item if needed
        "ctw-border-top": !hasBelowTheFoldItems,
      }),
    });
  }

  return (
    <div className={cx(className, "ctw-flex ctw-items-center")}>
      <div className="ctw-relative ctw-flex">
        {activeFilters.map((filter) => (
          <FilterBarPill
            key={filter.key}
            filter={filter}
            filterValues={activeFilterValues}
            handleAddOrRemoveFilter={addOrRemoveFilter}
            handleClearFilter={clearFilter}
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
          if (item.key === "_remove") {
            clearAllFilters();
          } else if (item.key === "_reset") {
            resetAllFilters();
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
