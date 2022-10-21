import { ReactElement } from "react";
import { Spinner } from "../spinner";

import type { MinRecordItem, TableColumn } from "./table";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";

type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
  isLoading: boolean;
  emptyMessage: string | ReactElement;
  handleRowClick?: (record: T) => void;
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  isLoading,
  emptyMessage,
  handleRowClick,
}: TableRowsProps<T>) => {
  if (isLoading) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        <div className="ctw-flex ctw-items-center ctw-justify-center ctw-space-x-2">
          <span>Loading...</span>
          <Spinner />
        </div>
      </TableFullLengthRow>
    );
  }

  if (records.length === 0) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        {emptyMessage}
      </TableFullLengthRow>
    );
  }

  return (
    <>
      {records.map((record) => (
        <tr key={record.id} onClick={() => {
          if (handleRowClick) handleRowClick(record);
        }}>
          {columns.map((column, index) => (
            <TableDataCell
              key={column.title ?? index}
              column={column}
              record={record}
              index={index}
            />
          ))}
        </tr>
      ))}
    </>
  );
};
