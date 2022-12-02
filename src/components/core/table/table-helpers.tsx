import { get, iteratee, ListIteratee, Many, orderBy } from "lodash";
import { ReactNode } from "react";
import { SortDir } from "@/utils/sort";

export interface MinRecordItem {
  id: string | number;
}

export type TableSort = { columnTitle: string; dir: SortDir };

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
  className?: string;
  widthPercent?: number;
  minWidth?: number;
  sortIndices?: (keyof T)[];
} & (DataIndexSpecified<T> | RenderSpecified<T>);

export function sortRecords<T extends MinRecordItem>(
  records: T[],
  columns: TableColumn<T>[],
  sort?: TableSort
) {
  const sortColumn = columns.find(
    (column) => column.title === sort?.columnTitle
  );
  // If there is a sort applied to a column, then sort the records.
  if (sort && sortColumn?.sortIndices) {
    return sortByIndex(records, sortColumn.sortIndices, sort.dir);
  }
  return records;
}

export function sortByIndex<T>(
  records: T[],
  indices: (keyof Partial<T>)[],
  dir: SortDir
) {
  // Disabling @typescript-eslint/no-unnecessary-condition since the index may not exist.
  // For the first sort index, sort in the way the user selected.
  let iteratees: ListIteratee<T>[] = [
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (o) => (o[indices[0]] && dir === "asc" ? "a" : "b"),
    indices[0],
  ];
  // For remaining indices, just sort in asccending.
  indices.slice(1, indices.length).forEach((index) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    iteratees = [...iteratees, (o) => (o[index] ? "a" : "b"), index];
  });

  return orderBy(records, iteratees, [
    dir,
    ...Array(indices.length).fill("asc"),
  ]);
}
