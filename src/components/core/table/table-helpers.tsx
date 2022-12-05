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
  // Generates a value that only looks at whether the value at a given index is blank or not.
  // Keeps blanks last by making them true (higher value) when ascending, false (lower value) when descending.
  const getIterateeBlanksLast = (o: T, index: keyof T, indexDir: SortDir) =>
    // ESLint disabled as the index may not exist on this object.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (dir === "asc" && !o[index]) || (dir === "desc" && o[index]);

  // Makes a list of iteratees, where each index iteratee is preceded by an iteratee that ensures blanks go last.
  let iteratees: ListIteratee<T>[] = [];
  indices.forEach((sortIndex, i) => {
    // Sorting for the first index is in the given direction.
    if (i === 0) {
      iteratees = [(o) => getIterateeBlanksLast(o, sortIndex, dir), sortIndex];
    } else {
      // Sorting for other indices is ascending.
      iteratees = [
        ...iteratees,
        (o) => getIterateeBlanksLast(o, sortIndex, "asc"),
        sortIndex,
      ];
    }
  });

  return orderBy(records, iteratees);
}
