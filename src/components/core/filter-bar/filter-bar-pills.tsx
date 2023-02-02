import type {
  FilterItem,
  FilterOptionCheckbox,
  FilterOptionSelect,
} from "./filter-bar";
import cx from "classnames";
import { FilterValuesRecord } from "./filter-bar";
import { displayFilterItem } from "./filter-bar-utils";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { ListBox } from "@/components/core/list-box/list-box";
import { isString } from "@/utils/nodash";
import { omit, set } from "@/utils/nodash/fp";

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
    </DropdownMenuAction>
  );
}

type FilterBarSelectPillProps = {
  filter: FilterOptionSelect;
  filterValues: FilterValuesRecord;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove: () => void;
};
function FilterBarSelectPill({
  filter,
  onChange,
  filterValues,
  onRemove,
}: FilterBarSelectPillProps) {
  const items = [
    {
      display: "Choose a selection",
      key: "clear",
    },
    ...filter.values,
    "reset",
  ];
  return (
    <ListBox
      useBasicStyles
      btnClassName={buttonClassName}
      items={items.map((item) => ({
        display: isString(item) ? item : item.display,
        key: isString(item) ? item : item.key,
        className: "ctw-capitalize",
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
          filterValues={filterValues}
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
