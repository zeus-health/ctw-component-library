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
import { isFunction } from "@/utils/nodash/fp";

const iconClassNames = "ctw-text-content-light ctw-h-3.5 ctw-mt-0 ctw-mr-1";

export function getIcon(icon: string) {
  switch (icon) {
    case "arrow-down":
      return <ArrowDownIcon className={iconClassNames} />;
    case "check":
      return <CheckIcon className={iconClassNames} />;
    case "chevron-down":
      return (
        <ChevronDownIcon className={cx(iconClassNames, "ctw-scale-110")} />
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
