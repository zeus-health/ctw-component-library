import cx from "classnames";
import { MenuItems } from "../dropdown-menu";

import type { MinRecordItem, TableColumn } from "./table";

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
  rowActions?: MenuItems[];
};

export const TableHead = <T extends MinRecordItem>({
  columns,
  rowActions,
}: TableHeadProps<T>) => (
  <thead>
    <tr className="ctw-hidden ctw-border-b-divider-main">
      {columns.map((column, index) => (
        <th
          key={column.title ?? index}
          scope="col"
          className={cx(
            column.className,
            "ctw-px-3 ctw-py-3 ctw-text-left ctw-text-xs ctw-font-medium ctw-uppercase ctw-tracking-wider ctw-text-content-light"
          )}
        >
          {column.title}
        </th>
      ))}
      {rowActions && <th className="ctw-table-action-column">&nbsp;</th>}
    </tr>
  </thead>
);
