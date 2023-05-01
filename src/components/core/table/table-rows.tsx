import cx from "classnames";
import { ComponentType, ReactElement } from "react";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";
import { MinRecordItem, TableColumn } from "./table-helpers";
import { Spinner } from "../spinner";
import { isFunction } from "@/utils/nodash";

export type TableRowsProps<T extends MinRecordItem> = {
  RowActions?: ComponentType<{ record: T }>;
  columns: TableColumn<T>[];
  emptyMessage: string | ReactElement;
  getRowClassName?: (record: T) => cx.Argument;
  handleRowClick?: (record: T) => void;
  isLoading: boolean;
  records: T[];
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  isLoading,
  emptyMessage,
  handleRowClick,
  RowActions,
  getRowClassName,
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
        <span className="ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0">{emptyMessage}</span>
      </TableFullLengthRow>
    );
  }

  return (
    <>
      {records.map((record) => (
        <tr
          data-zus-telemetry-click={handleRowClick ? "Table row" : null}
          // ctw-mx-px fixes bug where side borders disappear on hover when stacked.
          className={cx(
            "ctw-group ctw-relative ctw-mx-px",
            isFunction(getRowClassName) ? getRowClassName(record) : "",
            {
              "ctw-cursor-pointer hover:ctw-bg-bg-lighter": isFunction(handleRowClick),
            }
          )}
          key={record.key}
          onClick={({ target }) => {
            // This is for the case where a user clicks area near the button (but not on), we do not want have the onRowClick handler trigger as that will cause confusion to the user.
            if (target instanceof HTMLElement && target.querySelectorAll("button").length) {
              return;
            }

            if (handleRowClick) handleRowClick(record);
          }}
        >
          {columns.map((column, index) => (
            <TableDataCell
              key={`${record.key}_${column.title ?? index}`}
              column={column}
              record={record}
            />
          ))}
          {RowActions && (
            // Add onClick here to prevent clicks from propagating to
            // the to the tr's onClick for onRowClick.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <td
              className="ctw-table-row-actions group-hover:ctw-visible"
              onClick={(event) => event.stopPropagation()}
            >
              <RowActions record={record} />
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
