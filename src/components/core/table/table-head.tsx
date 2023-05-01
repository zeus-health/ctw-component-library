import { MinRecordItem, TableColumn } from "./table-helpers";

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
};

export const TableHead = <T extends MinRecordItem>({ columns }: TableHeadProps<T>) => (
  <thead data-zus-telemetry-namespace="TableHead">
    <tr>
      {columns.map((column, index) => (
        <th className="ctw-group" key={column.title ?? index} scope="col">
          <div className="ctw-flex ctw-items-center ctw-space-x-2">
            <div>{column.title}</div>
          </div>
        </th>
      ))}
    </tr>
  </thead>
);
