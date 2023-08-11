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

  return (
    <div
      className={cx(
        className,
        "ctw-flex ctw-items-start ctw-justify-between ctw-space-x-2 ctw-pt-2 sm:ctw-pt-1.5"
      )}
    >
      <div className="ctw-flex ctw-flex-col ctw-flex-wrap ctw-gap-x-2 sm:ctw-flex-row">
        {viewOptions && (
          <ViewButton
            className={cx(viewOptions.className, "ctw-mb-2")}
            defaultView={viewOptions.defaultView}
            onChange={viewOptions.onChange}
            options={viewOptions.options}
          />
        )}
        {sortOptions && (
          <SortButton
            className={cx(sortOptions.className, "ctw-mb-2")}
            defaultSort={sortOptions.defaultSort}
            onChange={sortOptions.onChange}
            options={sortOptions.options}
          />
        )}
        {filterOptions && filterOptions.filters.length > 0 && <FilterBar {...filterOptions} />}
      </div>
      <div className="ctw-ml-auto ctw-whitespace-nowrap">{action}</div>
    </div>
  );
};
