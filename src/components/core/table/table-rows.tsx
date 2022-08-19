import cx from "classnames";
import { KeyboardEvent } from "react";
import { Spinner } from "../spinner";
import { MinRecordItem, TableColumn as TableColumnType } from "./table";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";

type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumnType<T>[];
  onRowClick: ((row: T) => void) | undefined;
  isLoading: boolean;
  emptyMessage: string;
  showLeftTableBorderShadow: boolean;
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  onRowClick,
  isLoading,
  emptyMessage,
  showLeftTableBorderShadow,
}: TableRowsProps<T>) => {
  if (isLoading) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        Loading... <Spinner />
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
  const tableRowProps = (record: T, recordIndex: number) =>
    onRowClick
      ? {
          className: cx(
            // Add bottom radius to last row to fix issue with focus ring.
            // Otherwise the row's focus ring would get cutoff since the table is rounded.
            {
              "ctw-rounded-b-lg": recordIndex === records.length - 1,
            },
            "ctw-cursor-pointer hover:ctw-bg-bg-lighter ctw-ring-primary-main focus-visible:ctw-ring-2 ctw-ring-inset ctw-outline-none"
          ),
          tabIndex: 0,
          onKeyUp: (event: KeyboardEvent<HTMLTableRowElement>) => {
            if (event.key === "Enter") {
              onRowClick(record);
            }
          },
          onClick: () => onRowClick(record),
        }
      : {};

  return (
    <>
      {records.map((record, recordIndex) => (
        <tr key={record.id} {...tableRowProps(record, recordIndex)}>
          {columns.map((column, index) => {
            return (
              <TableDataCell
                key={column.title ?? index}
                column={column}
                record={record}
                index={index}
                showLeftTableBorderShadow={showLeftTableBorderShadow}
              />
            );
          })}
        </tr>
      ))}
    </>
  );
};
