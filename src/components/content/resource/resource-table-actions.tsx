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
  viewOptions?: ViewButtonProps<T>;
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

  const vo = viewOptions;
  if (vo) {
    vo.className = cx(vo.className, "ctw-mt-2");
  }
  const so = sortOptions;
  if (so) {
    so.className = cx(so.className, "ctw-mt-2");
  }

  return (
    <div
      className={cx(
        className,
        "ctw-flex ctw-items-start ctw-justify-between ctw-py-2 sm:ctw-pt-1.5"
      )}
    >
      <div className="ctw-flex ctw-flex-wrap ctw-gap-x-2 ctw-gap-y-2">
        {vo && <ViewButton {...vo} />}
        {so && <SortButton {...so} />}
        {filterOptions && filterOptions.filters.length > 0 && <FilterBar {...filterOptions} />}
      </div>
      <div className="ctw-ml-auto ctw-whitespace-nowrap">{action}</div>
    </div>
  );
};
