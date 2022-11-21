import cx from "classnames";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { DEFAULT_PAGE_SIZE, Pagination } from "../pagination/pagination";
import { TableColGroup } from "./table-colgroup";
import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";
import "./table.scss";

export type SortDir = "asc" | "desc";

export type TableSort = { columnTitle: string; dir: SortDir };

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
  sortFn?: (a: T, b: T, dir: SortDir) => number;
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
  sort?: TableSort;
  onSort?: (sort: TableSort) => void;
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
  sort,
  onSort,
  handleRowClick,
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [count, setCount] = useState(DEFAULT_PAGE_SIZE);

  const sortFn = columns.find(
    (column) => column.title === sort?.columnTitle
  )?.sortFn;
  let sortedRecords = records;
  if (sortFn && sort) {
    sortedRecords = records.sort((a, b) => sortFn(a, b, sort.dir));
  }

  const updateShadows = () => {
    const container = scrollContainerRef.current;
    const table = tableRef.current;
    if (container && table) {
      setShowLeftShadow(container.scrollLeft > 0);
      const rightSide = container.scrollLeft + container.clientWidth;
      setShowRightShadow(rightSide < table.clientWidth);
    }
  };

  const switchSort = (newSortColumn: string) => {
    const newState: TableSort = {
      columnTitle: newSortColumn,
      dir: "asc",
    };
    if (newSortColumn === sort?.columnTitle) {
      newState.dir = sort.dir === "asc" ? "desc" : "asc";
    }
    if (onSort) onSort(newState);
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
        className={cx("ctw-table-container", {
          "ctw-table-scroll-left-shadow": showLeftShadow,
          "ctw-table-scroll-right-shadow": showRightShadow,
        })}
      >
        <div className="ctw-scrollbar" ref={scrollContainerRef}>
          <table ref={tableRef}>
            {hasData && <TableColGroup columns={columns} />}
            {showTableHead && hasData && (
              <TableHead columns={columns} sort={sort} onSort={switchSort} />
            )}

            <tbody>
              <TableRows
                records={sortedRecords.slice(0, count)}
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
