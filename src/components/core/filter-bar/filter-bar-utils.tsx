import type { FilterItem, FilterItemStatus } from "./filter-bar";
import {
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import { isFunction } from "@/utils/nodash/fp";

const iconClassNames = "ctw-text-content-light ctw-h-3 ctw-mt-1 ctw-mr-1";

export function getIcon(icon: string) {
  switch (icon) {
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
