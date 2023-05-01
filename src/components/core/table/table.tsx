import "./table.scss";

import cx from "classnames";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { TableColGroup } from "./table-colgroup";
import { TableHead } from "./table-head";
import { MinRecordItem, TableColumn } from "./table-helpers";
import { TableRows, TableRowsProps } from "./table-rows";
import { DEFAULT_PAGE_SIZE, PaginationList } from "../pagination/pagination-list";

export type RowActionsProps<T extends MinRecordItem> = { record: T };

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
} & Pick<TableRowsProps<T>, "handleRowClick" | "RowActions" | "getRowClassName">;

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

  return (
    <div
      data-zus-telemetry-namespace="Table"
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
              />
            </tbody>
          </table>
        </div>
      </div>
      {!hidePagination && !isLoading && (
        <PaginationList total={records.length} count={count} changeCount={setCount} />
      )}
      {children}
    </div>
  );
};
