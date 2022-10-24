import type { MinRecordItem, TableColumn } from "./table";

export type TableColGroupProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
};

export const TableColGroup = <T extends MinRecordItem>({
  columns,
}: TableColGroupProps<T>) => (
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
