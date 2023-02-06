import cx from "classnames";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { displayFilterItem } from "@/components/core/filter-bar/filter-bar-utils";
import { set } from "@/utils/nodash/fp";

type FilterBarTagPillProps = {
  filter: FilterItem;
  onRemove: () => void;
};

const buttonClassName =
  "ctw-flex ctw-items-center ctw-max-w-[15rem] ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-my-2 ctw-py-2 ctw-px-3 ctw-relative ctw-mr-1 ctw-cursor-pointer ctw-border-0 ctw-border-transparent";

export function FilterBarTagPill({ filter, onRemove }: FilterBarTagPillProps) {
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
