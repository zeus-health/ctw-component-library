import { MinRecordItem, TableColumn } from "./table-helpers";

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
        width={column.widthPercent ? `${column.widthPercent}%` : "0*"}
        style={{
          minWidth: column.minWidth,
        }}
      />
    ))}
  </colgroup>
);
