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
        <th key={column.title ?? index} scope="col">
          {column.title}
        </th>
      ))}
    </tr>
  </thead>
);
