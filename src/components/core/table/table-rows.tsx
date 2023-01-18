import cx from "classnames";
import { isFunction } from "lodash";
import { ComponentType, ReactElement } from "react";
import { Spinner } from "../spinner";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";
import { MinRecordItem, TableColumn } from "./table-helpers";

export type TableRowsProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
  isLoading: boolean;
  emptyMessage: string | ReactElement;
  handleRowClick?: (record: T) => void;
  RowActions?: ComponentType<{ record: T }>;
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  isLoading,
  emptyMessage,
  handleRowClick,
  RowActions,
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
          data-zus-telemetry-click={handleRowClick ? "Table row" : null}
          // ctw-mx-px fixes bug where side borders disappear on hover when stacked.
          className={cx("ctw-group ctw-relative ctw-mx-px", {
            "ctw-cursor-pointer hover:ctw-bg-bg-lighter":
              isFunction(handleRowClick),
          })}
          key={record.id}
          onClick={({ target }) => {
            // This is for the case where a user clicks area near the button (but not on), we do not want have the onRowClick handler trigger as that will cause confusion to the user.
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
          {RowActions && (
            <td className="ctw-table-row-actions group-hover:ctw-visible">
              <RowActions record={record} />
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
