import cx from "classnames";
import { MinRecordItem, TableColumn } from "./table";

export type TableColumnProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
  showLeftTableBorderShadow: boolean;
};

export const TableHead = <T extends MinRecordItem>({
  columns,
  showLeftTableBorderShadow,
}: TableColumnProps<T>) => (
  <thead className="ctw-bg-bg-lighter">
    <tr>
      {columns.map((column, index) => (
        <th
          key={column.title ?? index}
          scope="col"
          className={cx(
            "ctw-px-3 ctw-py-3 ctw-text-left ctw-text-xs ctw-font-medium ctw-uppercase ctw-tracking-wider ctw-text-content-light",
            index === 0 && showLeftTableBorderShadow
              ? "ctw-table-scroll-left-shadow-sticky ctw-bg-bg-lighter group-hover:ctw-bg-bg-lighter"
              : ""
          )}
        >
          {column.title}
        </th>
      ))}
    </tr>
  </thead>
);
