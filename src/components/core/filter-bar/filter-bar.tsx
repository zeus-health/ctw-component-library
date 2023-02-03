import cx from "classnames";
import { useEffect, useState } from "react";
import { displayFilterItem, getIcon } from "./filter-bar-utils";
import { FilterBarPill } from "@/components/core/filter-bar/filter-bar-pills";
import { ListBox } from "@/components/core/list-box/list-box";
import { omit, partition, uniq } from "@/utils/nodash/fp";

export type FilterBarProps = {
  className?: cx.Argument;
  handleOnChange: (filters: FilterChangeEvent) => void;
  filters: FilterItem[];
};

export type FilterItemStatus = {
  active: boolean;
};

export type MinFilterItem = {
  className?: cx.Argument;
  display: string | ((status: FilterItemStatus) => string);
  icon?: string;
  key: string;
  type: "tag";
};

export type FilterOptionSelect = {
  type: "select";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; display: string })[];
} & Omit<MinFilterItem, "type">;

export type FilterOptionCheckbox = {
  type: "checkbox";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; display: string })[];
} & Omit<MinFilterItem, "type">;

export type FilterItem =
  | MinFilterItem
  | FilterOptionSelect
  | FilterOptionCheckbox;

export type FilterValuesRecord = Record<string, string | string[]>;

export type FilterChangeEvent = Record<
  string,
  {
    key: string;
    selected: boolean | string | string[];
    type: "tag" | "checkbox" | "select";
  }
>;

function filterChangeEvent(
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

export const FilterBar = ({
  className,
  handleOnChange,
  filters,
}: FilterBarProps) => {
  const [activeFilterKeys, setActiveFilterKeys] = useState<string[]>([]);
  const [activeFilterValues, setActiveFilterValues] =
    useState<FilterValuesRecord>({});
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
    if (isSelected) {
      setActiveFilterValues({
        ...activeFilterValues,
        [key]:
          filter?.type === "checkbox"
            ? uniq(values.concat(valueKey))
            : valueKey,
      });
    } else if (Array.isArray(values)) {
      setActiveFilterValues({
        ...activeFilterValues,
        [key]: values.filter((k) => k !== valueKey),
      });
    } else {
      // Edge case, if not selected and values not array, just remove key
      setActiveFilterValues(omit(key, activeFilterValues));
    }
    handleOnChange(
      filterChangeEvent(filters, activeFilterKeys, activeFilterValues)
    );
  };

  const resetAllFilters = () => {
    setActiveFilterKeys([]);
    setActiveFilterValues({});
    handleOnChange({});
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
    <>
      <div className={cx(className, "ctw-relative ctw-inline-block")}>
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
        btnClassName="ctw-bg-transparent ctw-rounded ctw-text-content-light ctw-my-2 ctw-py-2 ctw-px-3"
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
    </>
  );
};
