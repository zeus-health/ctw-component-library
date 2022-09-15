import { DotsHorizontalIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { KeyboardEvent } from "react";
import { DropdownMenu, MenuItems } from "../dropdown-menu";

import { Spinner } from "../spinner";

import type { MinRecordItem, TableColumn } from "./table";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";

type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
  onRowClick: ((row: T) => void) | undefined;
  isLoading: boolean;
  emptyMessage: string;
  showLeftTableBorderShadow: boolean;
  showRightTableBorderShadow: boolean;
  rowActions?: MenuItems[];
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  onRowClick,
  isLoading,
  emptyMessage,
  showLeftTableBorderShadow,
  showRightTableBorderShadow,
  rowActions,
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
        <tr {...tableRowProps(record, recordIndex)} key={record.id}>
          {columns.map((column, index) => (
            <TableDataCell
              key={column.title ?? index}
              column={column}
              record={record}
              index={index}
              showLeftTableBorderShadow={showLeftTableBorderShadow}
            />
          ))}
          {rowActions && (
            <td
              className={cx("ctw-table-action-column", {
                "ctw-table-action-column-sticky": showRightTableBorderShadow,
              })}
            >
              <DropdownMenu menuItems={rowActions} data={record}>
                <DotsHorizontalIcon className="ctw-w-5" />
              </DropdownMenu>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
