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

// Sorts records based on 1 or more indices.
export function sortByIndex<T>(
  records: T[],
  indices: (keyof T)[],
  dir: SortDir
) {
  // Makes a list of iteratees, where each index iteratee is preceded by an iteratee that ensures blanks go last.
  // First index is in the direction set by the user. Rest are ascending.
  let iteratees: ListIteratee<T>[] = [];
  let orders: SortDir[] = [];
  indices.forEach((sortIndex, i) => {
    if (i === 0) {
      // Sort first index in user-chosen direction. Disable ESLint, index may not exist.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      iteratees = [(o) => o[sortIndex] === undefined, sortIndex];
      orders = orders.concat(["asc", dir]);
    } else {
      // Sort other indices ascending. Disable ESlint, index may not exist.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      iteratees = [...iteratees, (o) => o[sortIndex] === undefined, sortIndex];
      orders = orders.concat(["asc", "asc"]);
    }
  });

  return orderBy(records, iteratees, orders);
}
