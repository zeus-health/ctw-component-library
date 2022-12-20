import cx from "classnames";
import { ReactElement } from "react";
import { Spinner } from "../spinner";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";
import { MinRecordItem, TableColumn } from "./table-helpers";

type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
  isLoading: boolean;
  emptyMessage: string | ReactElement;
  handleRowClick?: (record: T) => void;
  rowActions?: (record: T) => JSX.Element;
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  isLoading,
  emptyMessage,
  handleRowClick,
  rowActions,
}: TableRowsProps<T>) => {
  if (isLoading) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        <div className="ctw-flex ctw-justify-center ctw-space-x-2">
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
        <tr
          className={cx(
            "ctw-group ctw-relative ctw-z-10 hover:ctw-bg-bg-lighter",
            {
              "ctw-cursor-pointer": typeof handleRowClick === "function",
            }
          )}
          key={record.id}
          onClick={(event) => {
            const { target } = event;
            // This is for the use case where we do not want have the onRowClick called in areas near the button as that will cause confusion to the user
            if (
              target instanceof HTMLElement &&
              target.querySelectorAll("button").length
            ) {
              return;
            }

            if (handleRowClick) handleRowClick(record);
          }}
        >
          {columns.map((column, index) => (
            <TableDataCell
              key={column.title ?? index}
              column={column}
              record={record}
              index={index}
            />
          ))}
          {rowActions && (
            <td className="ctw-action-hover ctw-invisible ctw-absolute ctw-right-0 ctw-z-20 ctw-flex ctw-h-full ctw-items-center ctw-space-x-2 ctw-px-4 group-hover:ctw-visible">
              {rowActions(record)}
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
