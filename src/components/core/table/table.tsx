import cx from "classnames";
import { ReactNode } from "react";

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
  const hasData = !isLoading && records.length > 0;

  return (
    <div className={cx("ctw-table-container", className)}>
      <table>
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
  );
};
