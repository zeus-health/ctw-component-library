import cx from "classnames";
import { ReactNode } from "react";
import { MinRecordItem, TableColumn } from "./table-helpers";

type TableColumnProps<T extends MinRecordItem> = {
  column: TableColumn<T>;
  record: T;
};

export const TableDataCell = <T extends MinRecordItem>({
  column,
  record,
}: TableColumnProps<T>): JSX.Element => {
  const value = column.dataIndex
    ? (record[column.dataIndex] as unknown as ReactNode)
    : undefined;

  return (
    <td
      className={cx(
        "ctw-text-content-black first:ctw-font-medium",
        column.className,
        // Added ctw-break-words because AbdominalReallyLongWordThatShouldBReakButDoeskadjlkajflkajsf doesn't wrap correclty without it.
        "ctw-hyphens-auto ctw-break-words"
      )}
    >
      {column.render ? column.render(record) : value}
    </td>
  );
};
