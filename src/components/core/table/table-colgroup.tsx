import type { MinRecordItem, TableColumn } from "./table";

export type TableColgroupProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
};

export const TableColgroup = <T extends MinRecordItem>({
  columns,
}: TableColgroupProps<T>) => (
  <colgroup>
    {columns.map((column, index) => (
      <col
        key={column.title ?? index}
        className={column.className}
        style={{
          minWidth: column.minWidth,
          width: `${column.widthPercent}%`,
        }}
      />
    ))}
  </colgroup>
);
