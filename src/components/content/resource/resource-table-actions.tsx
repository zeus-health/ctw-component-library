import cx from "classnames";
import { ReactNode } from "react";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { FilterBarProps } from "@/components/core/filter-bar/filter-bar-types";
import {
  SortButton,
  SortButtonProps,
} from "@/components/core/sort-button/sort-button";
import { MinRecordItem } from "@/components/core/table/table-helpers";

export type ResourceTableActionsProps<T extends MinRecordItem> = {
  className?: string;
  sortOptions?: SortButtonProps<T>;
  filterOptions?: FilterBarProps;
  action?: ReactNode;
};

export const ResourceTableActions = <T extends MinRecordItem>({
  className,
  sortOptions,
  filterOptions,
  action,
}: ResourceTableActionsProps<T>) => {
  const isEmpty = !sortOptions && !filterOptions && !action;
  if (isEmpty) {
    return null;
  }

  return (
    <div
      className={cx(
        className,
        "ctw-flex ctw-flex-wrap ctw-items-center ctw-justify-between ctw-py-2 sm:ctw-pt-1.5"
      )}
    >
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2">
        {sortOptions && <SortButton {...sortOptions} />}
        {filterOptions && <FilterBar {...filterOptions} />}
      </div>

      {action}
    </div>
  );
};
