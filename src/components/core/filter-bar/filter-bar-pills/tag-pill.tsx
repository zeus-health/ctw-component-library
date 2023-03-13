import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";
import { displayFilterItem } from "@/components/core/filter-bar/filter-bar-utils";

type FilterBarTagPillProps = {
  filter: FilterItem;
  onRemove: () => void;
};

const buttonClassName =
  "ctw-flex ctw-items-center ctw-max-w-[15rem] ctw-capitalize ctw-text-content-black ctw-bg-bg-dark ctw-text-sm ctw-rounded ctw-py-2 ctw-px-3 ctw-relative ctw-cursor-pointer ctw-border-0 ctw-border-transparent";

export function FilterBarTagPill({ filter, onRemove }: FilterBarTagPillProps) {
  return (
    <button
      key={filter.key}
      type="button"
      className={cx(buttonClassName, filter.className, "ctw-space-x-2")}
      onClick={onRemove}
    >
      <div>{displayFilterItem(filter, { active: true })}</div>
      <FontAwesomeIcon icon={faX} className="ctw-w-2 ctw-text-content-light" />
    </button>
  );
}
