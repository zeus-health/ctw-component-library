import cx from "classnames";
import { MenuItems } from "../dropdown-menu";

import type { MinRecordItem, TableColumn } from "./table";

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
  showLeftTableBorderShadow: boolean;
  showRightTableBorderShadow: boolean;
  rowActions?: MenuItems[];
};

export const TableHead = <T extends MinRecordItem>({
  columns,
  showLeftTableBorderShadow,
  showRightTableBorderShadow,
  rowActions,
}: TableHeadProps<T>) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th
          key={column.title ?? index}
          scope="col"
          className={cx(
            "ctw-px-3 ctw-py-3 ctw-text-left ctw-text-xs ctw-font-medium ctw-uppercase ctw-tracking-wider ctw-text-content-light",
            index === 0 && showLeftTableBorderShadow
              ? "ctw-table-scroll-left-shadow-sticky ctw-bg-white group-hover:ctw-bg-bg-lighter"
              : "",
            column.className
          )}
        >
          {column.title}
        </th>
      ))}
      {rowActions && (
        <th
          className={cx("ctw-table-action-column", {
            "ctw-table-action-column-sticky": showRightTableBorderShadow,
          })}
        >
          &nbsp;
        </th>
      )}
    </tr>
  </thead>
);
