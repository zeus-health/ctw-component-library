import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import {
  FilterOptionCheckbox,
  FilterValuesRecord,
} from "@/components/core/filter-bar/filter-bar-types";
import { displayFilterItem } from "@/components/core/filter-bar/filter-bar-utils";
import { isString } from "@/utils/nodash";
import { compact } from "@/utils/nodash/fp";

type FilterBarCheckboxPillProps = {
  filter: FilterOptionCheckbox;
  filterValues: FilterValuesRecord;
  isOpen: boolean;
  onChange: (key: string, isSelected: boolean) => void;
  onRemove?: () => void;
};

const buttonClassName =
  "ctw-flex ctw-items-center ctw-max-w-[15rem] ctw-space-x-2 ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-py-2 ctw-px-3 ctw-relative ctw-cursor-pointer ctw-border-0 ctw-border-transparent  ctw-whitespace-nowrap";

export function FilterBarCheckboxPill({
  filter,
  filterValues,
  isOpen,
  onRemove,
  onChange,
}: FilterBarCheckboxPillProps) {
  const selected = filter.key in filterValues ? filterValues[filter.key] : [];
  const items = filter.values.map((item) => ({
    key: isString(item) ? item : item.key,
    name: isString(item) ? item : item.name,
    display: isString(item) ? undefined : item.display,
    isSelected: selected.includes(isString(item) ? item : item.key),
  }));

  const selectedItems = items
    .filter((item) => item.isSelected)
    .map((item) => item.key);

  return (
    <DropdownMenuAction
      isOpen={isOpen}
      items={items}
      type="checkbox"
      pinnedActions={compact([
        onRemove
          ? {
              icon: faTrash,
              name: "Remove Filter",
              action: onRemove,
            }
          : null,
      ])}
      buttonClassName={cx(filter.className, buttonClassName)}
      onItemSelect={(item) => onChange(item.key, item.value)}
    >
      <div className="ctw-truncate ctw-font-medium ctw-text-content-black">
        {displayFilterItem(filter, { active: true })}
        {selectedItems.length > 0 && (
          <span className="ctw-font-normal">: {selectedItems.join(", ")}</span>
        )}
      </div>

      <FontAwesomeIcon icon={faChevronDown} className="ctw-w-2" />
    </DropdownMenuAction>
  );
}
