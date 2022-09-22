import cx from "classnames";
import { ReactNode } from "react";

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
}: TableProps<T>) => (
  <div className={cx("ctw-py-2 ctw-align-middle", className)}>
    <div
      /* Border radius has to be same as table. 
           For some reason the overflow: hidden also hides the table borders, so add some padding to get them back. */
      className="ctw-relative ctw-overflow-hidden ctw-rounded-lg ctw-p-px"
    >
      <div className="ctw-flex ctw-overflow-x-auto ctw-rounded-lg ctw-shadow ctw-ring-1 ctw-ring-divider-light ctw-ring-opacity-5">
        <table className="ctw-table-base ctw-w-full ctw-divide-y ctw-divide-divider-main">
          {showTableHead && <TableHead columns={columns} />}

          <tbody className="ctw-divide-y ctw-divide-divider-light ctw-bg-white">
            <TableRows
              records={records}
              columns={columns}
              onRowClick={onRowClick}
              isLoading={isLoading}
              emptyMessage={message}
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
