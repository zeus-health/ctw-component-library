import cx from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TableColumns } from "./columns";
import { TableRows } from "./rows";

export interface MinRecordItem {
  id: string | number;
}

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
} & (DataIndexSpecified<T> | RenderSpecified<T>);

// Set of props that are optional configurations for the table.
export type TableOptionProps<T> = {
  onRowClick?: (row: T) => void; // Adds a row hover effect and calls onClick.
  isLoading?: boolean;
  message?: string;
};

export type TableProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
} & TableOptionProps<T>;

export const Table = <T extends MinRecordItem>({
  columns,
  records,
  onRowClick,
  isLoading = false,
  message = "No records found",
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
  }, []);

  const TableFullLengthRow = ({ children }: { children: ReactNode }) => (
    <tr>
      <td className="ctw-text-content-light ctw-p-6" colSpan={columns.length}>
        {children}
      </td>
    </tr>
  );

  return (
    <div className="ctw-py-2 ctw-align-middle md:ctw-px-6 lg:ctw-px-8">
      <div
        /* Border radius has to be same as table. 
           For some reason the overflow: hidden also hides the table borders, so add some padding to get them back. */
        className={cx(
          "ctw-relative ctw-overflow-hidden ctw-rounded-lg ctw-p-px",
          {
            "ctw-table-scroll-right-shadow": showRightTableBorderShadow,
          }
        )}
      >
        <div
          ref={containerTableRef}
          className="ctw-scrollbar ctw-flex ctw-overflow-x-auto ctw-rounded-lg ctw-shadow ctw-ring-1 ctw-ring-black ctw-ring-opacity-5"
        >
          <table
            className="ctw-divide-divider-main ctw-table-base ctw-divide-y"
            ref={tableRef}
          >
            <thead className="ctw-bg-bg-lighter">
              <TableColumns
                columns={columns}
                showLeftTableBorderShadow={showLeftTableBorderShadow}
              />
            </thead>
            <tbody className="ctw-divide-y ctw-divide-divider-light  ctw-bg-white">
              <TableRows
                records={records}
                columns={columns}
                onRowClick={onRowClick}
                isLoading={isLoading}
                emptyMessage={message}
                showLeftTableBorderShadow={showLeftTableBorderShadow}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
