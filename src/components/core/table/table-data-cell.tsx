import cx from "classnames";
import { ReactNode } from "react";

import type { MinRecordItem, TableColumn } from "./table";

type TableColumnProps<T extends MinRecordItem> = {
  column: TableColumn<T>;
  record: T;
  index: number;
};

export const TableDataCell = <T extends MinRecordItem>({
  column,
  record,
  index,
}: TableColumnProps<T>) => {
  const value = column.dataIndex
    ? (record[column.dataIndex] as unknown as ReactNode)
    : undefined;

  return (
    <td
      key={column.title ?? index}
      className={cx(
        "cq-w-sm:ctw-block cq-w-sm:ctw-w-full cq-w-sm:ctw-p-0 cq-w-sm:ctw-pr-7",
        "ctw-whitespace-pre-wrap ctw-px-3 ctw-py-4 ctw-text-sm",
        index === 0
          ? "ctw-font-medium ctw-text-content-black"
          : "ctw-text-content-light",
        column.className
      )}
    >
      {column.render ? column.render(record) : value}
    </td>
  );
};
