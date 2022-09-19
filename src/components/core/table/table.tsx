import cx from "classnames";
import { ReactNode } from "react";

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
}: TableProps<T>) => (
  <table className={cx("ctw-table-base", className)}>
    {showTableHead && <TableHead columns={columns} rowActions={rowActions} />}

    <tbody>
      <TableRows
        records={records}
        columns={columns}
        onRowClick={onRowClick}
        isLoading={isLoading}
        emptyMessage={message}
        rowActions={rowActions}
      />
    </tbody>
  </table>
);
