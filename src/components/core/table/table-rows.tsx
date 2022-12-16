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
  rowSibling?: (record: T) => ReactElement;
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
          className={cx("ctw-group", {
            "ctw-cursor-pointer": typeof handleRowClick === "function",
          })}
          key={record.id}
          onClick={(event) => {
            // Cast because the event target is always a Node.
            if ((event.target as Node).nodeName === "BUTTON") {
              event.preventDefault();
              event.stopPropagation();
            } else if (handleRowClick) handleRowClick(record);
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
        </tr>
      ))}
    </>
  );
};
