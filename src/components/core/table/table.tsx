import cx from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";
import "./table.scss";

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
  message?: string;
  showTableHead?: boolean;
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
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef<HTMLTableElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const updateShadows = () => {
    const container = containerRef.current;
    const table = tableRef.current;
    if (container && table) {
      setShowLeftShadow(container.scrollLeft > 0);
      const rightSide = container.scrollLeft + container.clientWidth;
      setShowRightShadow(rightSide < table.clientWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    // Update right away.
    updateShadows();

    // Update on scroll or resize events.
    container?.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      container?.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, [containerRef, isLoading]);

  const hasData = !isLoading && records.length > 0;

  return (
    <div
      className={cx(
        "ctw-table-container",
        {
          "ctw-table-scroll-left-shadow": showLeftShadow,
          "ctw-table-scroll-right-shadow": showRightShadow,
        },
        className
      )}
    >
      <div className="ctw-scrollbar" ref={containerRef}>
        <table ref={tableRef}>
          {hasData && (
            <colgroup>
              {columns.map((column, index) => (
                <col
                  key={column.title ?? index}
                  className={column.className}
                  style={{
                    minWidth: column.minWidth,
                    width: `${column.widthPercent}%`,
                  }}
                />
              ))}
            </colgroup>
          )}

          {showTableHead && hasData && <TableHead columns={columns} />}

          <tbody>
            <TableRows
              records={records}
              columns={columns}
              isLoading={isLoading}
              emptyMessage={message}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
