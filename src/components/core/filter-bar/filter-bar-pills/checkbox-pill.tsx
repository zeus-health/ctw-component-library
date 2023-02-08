import cx from "classnames";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import {
  FilterOptionCheckbox,
  FilterValuesRecord,
} from "@/components/core/filter-bar/filter-bar-types";
import {
  displayFilterItem,
  getIcon,
} from "@/components/core/filter-bar/filter-bar-utils";
import { isString } from "@/utils/nodash";
import { compact, omit } from "@/utils/nodash/fp";

type FilterBarCheckboxPillProps = {
  filter: FilterOptionCheckbox;
  filterValues: FilterValuesRecord;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove?: () => void;
  onReset?: () => void;
};

const buttonClassName =
  "ctw-flex ctw-items-center ctw-max-w-[15rem] ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-my-2 ctw-py-2 ctw-px-3 ctw-relative ctw-mr-1 ctw-cursor-pointer ctw-border-0 ctw-border-transparent";

export function FilterBarCheckboxPill({
  filter,
  filterValues,
  onRemove,
  onChange,
  onReset,
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
      pinnedActions={compact([
        onReset
          ? {
              decoration: getIcon("reset"),
              name: "Reset Filter",
              action: onReset,
            }
          : null,
        onRemove
          ? {
              decoration: getIcon("trash"),
              name: "Remove Filter",
              action: onRemove,
            }
          : null,
      ])}
      buttonClassName={cx(filter.className, buttonClassName)}
      onItemSelect={(item) => onChange(item.key, item.value)}
    >
      <span className="ctw-font-medium ctw-text-content-black">
        {displayFilterItem(omit("icon", filter), { active: true })}
        {selectedItems.length > 0 && ": "}
      </span>
      <span className="ctw-font-normal">{selectedItems.join(", ")}</span>
      <div className="ctw-flex">{getIcon("chevron-down")}</div>
    </DropdownMenuAction>
  );
}
