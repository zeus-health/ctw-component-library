import type { FilterItem, FilterItemStatus } from "./filter-bar-types";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import cx from "classnames";
import { FilterChangeEvent, FilterValuesRecord } from "./filter-bar-types";
import { isFunction, set } from "@/utils/nodash/fp";

const iconClassNames = "ctw-text-content-light ctw-h-3.5 ctw-mr-1";

export function getIcon(icon: string) {
  switch (icon) {
    case "arrow-down":
      return <ArrowDownIcon />;
    case "check":
      return <CheckIcon className={iconClassNames} />;
    case "chevron-down":
      return (
        <ChevronDownIcon className={cx(iconClassNames, " ctw-h-[1.25rem]")} />
      );
    case "eye":
      return <EyeIcon className={iconClassNames} />;
    case "eye-off":
      return <EyeOffIcon className={iconClassNames} />;
    case "plus":
      return <PlusIcon className={iconClassNames} />;
    case "trash":
      return <TrashIcon className={iconClassNames} />;
    case "x":
      return <XIcon className={iconClassNames} />;
    default:
      return <QuestionMarkCircleIcon />;
  }
}

export function displayFilterItem(
  { icon, display }: FilterItem,
  status: FilterItemStatus
) {
  return (
    <>
      {icon && getIcon(icon)}
      {isFunction(display) ? display(status) : display}
    </>
  );
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
export function filterChangeEventToValuesRecord(
  state: FilterChangeEvent
): FilterValuesRecord {
  return Object.keys(state).reduce((acc, key) => {
    const { selected, type } = state[key];
    if (type === "tag") {
      return set(key, [], acc);
    }
    return set(key, selected, acc);
  }, {});
}
