import cx from "classnames";
import { KeyboardEvent, ReactNode } from "react";
import { Spinner } from "../spinner";
import { MinRecordItem, TableColumn } from "./table";
import { TableFullLengthRow } from "./table-full-length-row";

type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
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
            const value = column.dataIndex
              ? (record[column.dataIndex] as unknown as ReactNode)
              : undefined;

            return (
              <td
                key={column.title ?? index}
                className={cx(
                  "ctw-whitespace-nowrap ctw-px-3 ctw-py-4 ctw-text-sm",
                  index === 0
                    ? "ctw-font-medium ctw-text-content-black"
                    : "ctw-text-content-light",
                  index === 0 && showLeftTableBorderShadow
                    ? "ctw-table-scroll-left-shadow-sticky ctw-bg-white group-hover:ctw-bg-bg-lighter"
                    : ""
                )}
              >
                {column.render ? column.render(record) : value}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
