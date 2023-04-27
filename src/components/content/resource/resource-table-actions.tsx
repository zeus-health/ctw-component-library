import cx from "classnames";
import { ReactNode } from "react";
import { ViewButton, ViewButtonProps } from "./helpers/view-button";
import { FilterBar } from "@/components/core/filter-bar/filter-bar";
import { FilterBarProps } from "@/components/core/filter-bar/filter-bar-types";
import { SortButton, SortButtonProps } from "@/components/core/sort-button/sort-button";
import { MinRecordItem } from "@/components/core/table/table-helpers";

export type ResourceTableActionsProps<T extends MinRecordItem> = {
  action?: ReactNode;
  className?: string;
  filterOptions?: FilterBarProps;
  sortOptions?: SortButtonProps<T>;
  viewOptions?: ViewButtonProps;
};

export const ResourceTableActions = <T extends MinRecordItem>({
  action,
  className,
  filterOptions,
  sortOptions,
  viewOptions,
}: ResourceTableActionsProps<T>) => {
  const isEmpty = !viewOptions && !sortOptions && !filterOptions && !action;
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
        {viewOptions && <ViewButton {...viewOptions} />}
        {sortOptions && <SortButton {...sortOptions} />}
        {filterOptions && filterOptions.filters.length > 0 && <FilterBar {...filterOptions} />}
      </div>

      {action}
    </div>
  );
};
