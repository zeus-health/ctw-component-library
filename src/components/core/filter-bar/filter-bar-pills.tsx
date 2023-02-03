import type {
  FilterItem,
  FilterItemStatus,
  FilterOptionCheckbox,
  FilterOptionSelect,
} from "./filter-bar";
import cx from "classnames";
import { FilterValuesRecord } from "./filter-bar";
import { displayFilterItem } from "./filter-bar-utils";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import {
  ListBox,
  ListBoxOptionStatus,
} from "@/components/core/list-box/list-box";
import { isString } from "@/utils/nodash";
import { isFunction, omit, set } from "@/utils/nodash/fp";

const buttonClassName =
  "ctw-capitalize ctw-bg-bg-lighter ctw-text-sm ctw-rounded ctw-text-content-light ctw-my-2 ctw-py-2 ctw-px-3 ctw-relative ctw-mr-1 ctw-cursor-pointer ctw-border-0 ctw-border-transparent";
function FilterBarTagPill({
  filter,
  onRemove,
}: {
  filter: FilterItem;
  onRemove: () => void;
}) {
  return (
    <button
      key={filter.key}
      type="button"
      className={cx(buttonClassName, filter.className)}
      onClick={onRemove}
    >
      {displayFilterItem(set("icon", "x", filter), { active: true })}
    </button>
  );
}
type FilterBarCheckboxPillProps = {
  filter: FilterOptionCheckbox;
  filterValues: FilterValuesRecord;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove: () => void;
};
function FilterBarCheckboxPill({
  filter,
  filterValues,
  onRemove,
  onChange,
}: FilterBarCheckboxPillProps) {
  const selected = filter.key in filterValues ? filterValues[filter.key] : [];
  const items = filter.values.map((item) => ({
    key: isString(item) ? item : item.key,
    name: isString(item) ? item : item.display,
    isSelected: selected.includes(isString(item) ? item : item.key),
  }));

  const selectedItems = items
    .filter((item) => item.isSelected)
    .map((item) => item.key);

  return (
    <DropdownMenuAction
      items={items}
      type="checkbox"
      pinnedActions={[
        {
          name: "Remove Filter",
          action: onRemove,
        },
      ]}
      buttonClassName={cx(filter.className, buttonClassName)}
      onItemSelect={(item) => onChange(item.key, item.value)}
    >
      {displayFilterItem(omit("icon", filter), { active: true })}
      {selectedItems.length > 0 && ": "}
      {selectedItems.join(", ")}
    </DropdownMenuAction>
  );
}

type FilterBarSelectPillProps = {
  filter: FilterOptionSelect;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove: () => void;
};
function FilterBarSelectPill({
  filter,
  onChange,
  onRemove,
}: FilterBarSelectPillProps) {
  const renderDisplay = (
    display: string | ((status: FilterItemStatus) => string)
  ) => (isFunction(display) ? display({ active: false }) : display);
  const clearButton = {
    display: ({ listView }: ListBoxOptionStatus) =>
      listView ? "clear filter" : renderDisplay(filter.display),
    key: "_clear",
  };
  const items = [...filter.values, clearButton];
  return (
    <ListBox
      useBasicStyles
      defaultIndex={items.length - 1} // clear index
      btnClassName={buttonClassName}
      items={items.map((item) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        display: ({ listView }: ListBoxOptionStatus) => {
          if (item === clearButton) {
            return item.display({ listView });
          }
          const title = isString(item) ? item : renderDisplay(item.display);
          return listView ? (
            title
          ) : (
            <>
              {renderDisplay(filter.display)}: {title}
            </>
          );
        },
        key: isString(item) ? item : item.key,
        className: cx("ctw-capitalize", {
          "ctw-border ctw-capitalize ctw-border-solid ctw-border-divider-light":
            item === clearButton,
        }),
      }))}
      onChange={(index, item) => {
        if (item.key === "reset") {
          onRemove();
        } else if (item.key === "clear") {
          onChange("", false);
        } else {
          onChange(item.key, true);
        }
      }}
    />
  );
}

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
