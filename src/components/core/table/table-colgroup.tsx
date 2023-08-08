import { MinRecordItem, TableColumn } from "./table-helpers";

export type TableColGroupProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
};

export const TableColGroup = <T extends MinRecordItem>({ columns }: TableColGroupProps<T>) => (
  <colgroup>
    {columns.map((column, index) => (
      <col
        key={column.title ?? index}
        className={column.className}
        {column.widthPercent ? `width=${column.widthPercent}%` : ""}
        style={{
          minWidth: column.minWidth,
        }}
      />
    ))}
  </colgroup>
);
