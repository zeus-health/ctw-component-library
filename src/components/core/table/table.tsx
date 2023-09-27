import "./table.scss";

import cx from "classnames";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { TableColGroup } from "./table-colgroup";
import { TableHead } from "./table-head";
import { MinRecordItem, TableColumn } from "./table-helpers";
import { TableRows, TableRowsProps } from "./table-rows";
import { DEFAULT_PAGE_SIZE, ExpandList } from "../pagination/expand-list";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type RowActionsProps<T extends MinRecordItem> = {
  record: T;
  onSuccess?: () => void;
  stacked?: boolean;
};

export type TableProps<T extends MinRecordItem> = {
  children?: ReactNode;
  className?: cx.Argument;
  columns: TableColumn<T>[];
  /** Displayed when we have 0 records. */
  emptyMessage?: string | ReactElement;
  hidePagination?: boolean;
  isLoading?: boolean;
  pageSize?: number;
  records: T[];
  showTableHead?: boolean;
  stacked?: boolean;
} & Pick<TableRowsProps<T>, "handleRowClick" | "RowActions" | "rowActions" | "getRowClassName">;

export type TableBaseProps<T extends MinRecordItem> = Omit<TableProps<T>, "records" | "columns">;

export const Table = <T extends MinRecordItem>({
  className,
  columns,
  records,
  isLoading = false,
  emptyMessage: message = "No records found",
  showTableHead = true,
  stacked,
  handleRowClick,
  RowActions,
  getRowClassName,
  hidePagination = false,
  pageSize = DEFAULT_PAGE_SIZE,
  children,
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [count, setCount] = useState(pageSize);
  const breakpoints = useBreakpoints(tableRef);

  const updateShadows = () => {
    const container = scrollContainerRef.current;
    const table = tableRef.current;
    if (container && table) {
      setShowLeftShadow(container.scrollLeft > 0);
      const rightSide = container.scrollLeft + container.clientWidth;
      setShowRightShadow(rightSide < table.clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    // Update right away.
    updateShadows();

    // Update on scroll or resize events.
    container?.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      container?.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, [scrollContainerRef, isLoading]);

  const hasData = !isLoading && records.length > 0;

  // useeffect to set the count to the default page size when the records change
  useEffect(() => {
    if (hidePagination && hasData) {
      setCount(records.length);
    } else {
      setCount(pageSize);
    }
  }, [records, pageSize, hidePagination, hasData]);

  return (
    <div
      className={cx("ctw-scrollable-pass-through-height ctw-space-y-4", {
        "ctw-table-stacked": stacked,
      })}
    >
      <div
        className={cx("ctw-table-container ctw-scrollable-pass-through-height", className, {
          "ctw-table-scroll-left-shadow": showLeftShadow,
          "ctw-table-scroll-right-shadow": showRightShadow,
        })}
      >
        <div className={cx("ctw-scrollbar ctw-scrollable-content")} ref={scrollContainerRef}>
          <table ref={tableRef}>
            {hasData && <TableColGroup columns={columns} />}
            {showTableHead && hasData && <TableHead columns={columns} />}
            <tbody className={cx({ "ctw-h-[7rem]": records.length === 0 })}>
              <TableRows
                getRowClassName={getRowClassName}
                records={records.slice(0, count)}
                handleRowClick={handleRowClick}
                RowActions={RowActions}
                columns={columns}
                isLoading={isLoading}
                emptyMessage={message}
                stacked={breakpoints.sm}
              />
            </tbody>
          </table>
        </div>
      </div>
      {!hidePagination && !isLoading && (
        <ExpandList total={records.length} count={count} changeCount={setCount} />
      )}
      {children}
    </div>
  );
};
