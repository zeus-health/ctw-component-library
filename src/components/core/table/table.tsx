import cx from "classnames";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";

import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";
import "./table.scss";

import { DEFAULT_PAGE_SIZE, Pagination } from "../pagination/pagination";
import { TableColGroup } from "./table-colgroup";

export interface MinRecordItem {
  id: string | number;
}

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
  className?: string;
  widthPercent?: number;
  minWidth?: number;
} & (DataIndexSpecified<T> | RenderSpecified<T>);

export type TableProps<T extends MinRecordItem> = {
  className?: string;
  records: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  /** Displayed when we have 0 records. */
  message?: string | ReactElement;
  showTableHead?: boolean;
  stacked?: boolean;
  handleRowClick?: (record: T) => void;
};

export type TableBaseProps<T extends MinRecordItem> = Omit<
  TableProps<T>,
  "records" | "columns"
>;

export const Table = <T extends MinRecordItem>({
  className,
  columns,
  records,
  isLoading = false,
  message = "No records found",
  showTableHead = true,
  stacked,
  handleRowClick,
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [count, setCount] = useState(DEFAULT_PAGE_SIZE);

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
      className={cx("ctw-space-y-4", className, {
        "ctw-table-stacked": stacked,
      })}
    >
      <div
        className={cx("ctw-table-container", "ctw-table", {
          "ctw-table-scroll-left-shadow": showLeftShadow,
          "ctw-table-scroll-right-shadow": showRightShadow,
        })}
      >
        <div className="ctw-scrollbar" ref={scrollContainerRef}>
          <table ref={tableRef}>
            {hasData && <TableColGroup columns={columns} />}
            {showTableHead && hasData && <TableHead columns={columns} />}

            <tbody>
              <TableRows
                records={records.slice(0, count)}
                handleRowClick={handleRowClick}
                columns={columns}
                isLoading={isLoading}
                emptyMessage={message}
              />
            </tbody>
          </table>
        </div>
      </div>
      {records.length > 0 && !isLoading && (
        <Pagination
          total={records.length}
          count={count}
          changeCount={setCount}
        />
      )}
    </div>
  );
};
