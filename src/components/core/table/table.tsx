import cx from "classnames";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";

import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";
import "./table.scss";

import { DEFAULT_PAGE_SIZE, Pagination } from "../pagination/pagination";
import { TableColgroup } from "./table-colgroup";

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
  message?: string | ReactElement;
  showTableHead?: boolean;
  stacked?: boolean;
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
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [displayedRecords, setDisplayedRecords] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setDisplayedRecords(records.slice(0, DEFAULT_PAGE_SIZE));
  }, [records]);

  const updateShadows = () => {
    const container = scrollContainerRef.current;
    const table = tableRef.current;
    if (container && table) {
      setShowLeftShadow(container.scrollLeft > 0);
      const rightSide = container.scrollLeft + container.clientWidth;
      setShowRightShadow(rightSide < table.clientWidth);
    }
  };

  const getNextRecords = () => {
    const newPageNumber = currentPage + 1;
    const finishIdx = Math.min(
      (newPageNumber + 1) * DEFAULT_PAGE_SIZE,
      records.length - 1
    );
    setCurrentPage(newPageNumber);
    setDisplayedRecords(records.slice(0, finishIdx));
  };

  const showAllRecords = () => {
    const lastPageNumber = records.length / DEFAULT_PAGE_SIZE + 1;
    setCurrentPage(lastPageNumber);
    setDisplayedRecords(records);
  };

  const resetRecords = () => {
    setCurrentPage(1);
    setDisplayedRecords(records.slice(0, DEFAULT_PAGE_SIZE));
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
    <>
      <div
        className={cx(
          "ctw-table-container",
          {
            "ctw-table-stacked": stacked,
            "ctw-table-scroll-left-shadow": showLeftShadow,
            "ctw-table-scroll-right-shadow": showRightShadow,
          },
          className
        )}
      >
        <div className="ctw-scrollbar" ref={scrollContainerRef}>
          <table ref={tableRef}>
            {hasData && <TableColgroup columns={columns} />}
            {showTableHead && hasData && <TableHead columns={columns} />}

            <tbody>
              <TableRows
                records={displayedRecords}
                columns={columns}
                isLoading={isLoading}
                emptyMessage={message}
              />
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={DEFAULT_PAGE_SIZE}
        total={records.length}
        onNext={getNextRecords}
        onAll={showAllRecords}
        onReset={resetRecords}
      />
    </>
  );
};
