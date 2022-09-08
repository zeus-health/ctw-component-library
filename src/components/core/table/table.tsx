import cx from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

import { MenuItems } from "../dropdown-menu";

import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";

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
} & (DataIndexSpecified<T> | RenderSpecified<T>);

export type TableProps<T extends MinRecordItem> = {
  className?: string;
  records: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void; // Adds a row hover effect and calls onClick.
  isLoading?: boolean;
  message?: string;
  showTableHead?: boolean;
  rowActions?: MenuItems[];
};

export type TableBaseProps<T extends MinRecordItem> = Omit<
  TableProps<T>,
  "records" | "columns"
>;

export const Table = <T extends MinRecordItem>({
  className,
  columns,
  records,
  onRowClick,
  isLoading = false,
  message = "No records found",
  showTableHead = true,
  rowActions,
}: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const containerTableRef = useRef<HTMLTableElement>(null);
  const [showLeftTableBorderShadow, setShowLeftTableBorderShadow] =
    useState(false);
  const [showRightTableBorderShadow, setShowRightTableBorderShadow] =
    useState(false);
  const handleShowingStickyTableScrollBorder = () => {
    if (containerTableRef.current && tableRef.current) {
      const containerRightSide =
        containerTableRef.current.scrollLeft +
        containerTableRef.current.clientWidth;
      setShowLeftTableBorderShadow(containerTableRef.current.scrollLeft > 0);
      setShowRightTableBorderShadow(
        containerRightSide < tableRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    const containerTableRefCurrent = containerTableRef.current;
    handleShowingStickyTableScrollBorder();

    if (containerTableRefCurrent) {
      containerTableRefCurrent.addEventListener(
        "scroll",
        handleShowingStickyTableScrollBorder
      );
    }

    return () => {
      if (containerTableRefCurrent) {
        containerTableRefCurrent.removeEventListener(
          "scroll",
          handleShowingStickyTableScrollBorder
        );
      }
    };
  }, [containerTableRef]);

  return (
    <div className={cx("ctw-py-2 ctw-align-middle", className)}>
      <div
        /* Border radius has to be same as table. 
           For some reason the overflow: hidden also hides the table borders, so add some padding to get them back. */
        className={cx(
          "ctw-relative ctw-overflow-hidden ctw-rounded-lg ctw-p-px",
          {
            "ctw-table-scroll-right-shadow":
              !rowActions && showRightTableBorderShadow,
          }
        )}
      >
        <div
          ref={containerTableRef}
          className="ctw-scrollbar ctw-flex ctw-overflow-x-auto ctw-rounded-lg ctw-shadow ctw-ring-1 ctw-ring-divider-light ctw-ring-opacity-5"
        >
          <table
            className=" ctw-table-base ctw-w-full ctw-divide-y ctw-divide-divider-main"
            ref={tableRef}
          >
            {showTableHead && (
              <TableHead
                columns={columns}
                showLeftTableBorderShadow={showLeftTableBorderShadow}
                showRightTableBorderShadow={showRightTableBorderShadow}
                rowActions={rowActions}
              />
            )}

            <tbody className="ctw-divide-y ctw-divide-divider-light ctw-bg-white">
              <TableRows
                records={records}
                columns={columns}
                onRowClick={onRowClick}
                isLoading={isLoading}
                emptyMessage={message}
                showLeftTableBorderShadow={showLeftTableBorderShadow}
                showRightTableBorderShadow={showRightTableBorderShadow}
                rowActions={rowActions}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
