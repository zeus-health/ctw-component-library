import type { FilterItem, FilterItemStatus } from "./filter-bar-types";
import {
  ArrowDownIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import cx from "classnames";
import { FilterChangeEvent, FilterValuesRecord } from "./filter-bar-types";
import { isFunction, set } from "@/utils/nodash/fp";

const iconClassNames = "ctw-text-content-light ctw-h-3.5 ctw-mr-1 ctw-my-auto";

export function getIcon(icon: string) {
  switch (icon) {
    case "arrow-down":
      return <ArrowDownIcon />;
    case "calendar":
      return <CheckIcon className={iconClassNames} />;
    case "check":
      return <CalendarIcon className={iconClassNames} />;
    case "chevron-down":
      return (
        <ChevronDownIcon className={cx(iconClassNames, " ctw-h-[1.25rem]")} />
      );
    case "clipboard":
      return <ClipboardIcon className={iconClassNames} />;
    case "eye":
      return <EyeIcon className={iconClassNames} />;
    case "eye-off":
      return <EyeOffIcon className={iconClassNames} />;
    case "plus":
      return <PlusIcon className={iconClassNames} />;
    case "reset":
      return <XCircleIcon className={iconClassNames} />;
    case "trash":
      return <TrashIcon className={iconClassNames} />;
    case "x":
      return <XIcon className={iconClassNames} />;
    default:
      return <QuestionMarkCircleIcon className={iconClassNames} />;
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
    const filterState = state[key];
    if (typeof filterState !== "undefined") {
      const { type } = filterState;
      if (type === "tag") {
        return set(key, [], acc);
      }
      return set(key, filterState.selected, acc);
    }
    return acc;
  }, {});
}
