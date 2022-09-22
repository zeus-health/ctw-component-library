import cx from "classnames";

import type { MinRecordItem, TableColumn } from "./table";

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
};

export const TableHead = <T extends MinRecordItem>({
  columns,
}: TableHeadProps<T>) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th
          key={column.title ?? index}
          scope="col"
          className={cx(
            "ctw-px-3 ctw-py-3 ctw-text-left ctw-text-xs ctw-font-medium ctw-uppercase ctw-tracking-wider ctw-text-content-light",
            column.className
          )}
        >
          {column.title}
        </th>
      ))}
    </tr>
  </thead>
);
