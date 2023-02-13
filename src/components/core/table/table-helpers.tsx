import { ReactNode } from "react";
import { isString, orderBy } from "@/utils/nodash";
import { SortDir } from "@/utils/sort";
import { isEmptyValue } from "@/utils/types";

export interface MinRecordItem {
  id: string | number;
}

export type TableSort = { columnTitle: string; dir: SortDir };
export type IndexSort<T> = { index: keyof T; dir?: SortDir; isDate?: boolean };

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
  className?: string;
  widthPercent?: number;
  minWidth?: number | string;
  sortIndices?: IndexSort<T>[];
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
    // Unless the direction of the sort index is overridden, set it to the user's sort selection.
    sortColumn.sortIndices = sortColumn.sortIndices.map((indexSort) => ({
      dir: sort.dir,
      ...indexSort,
    }));
    return sortByIndices(records, sortColumn.sortIndices);
  }
  return records;
}

type Comparator<T> = (a: T) => unknown;
export function sortByIndices<T>(records: T[], indexSorts: IndexSort<T>[]) {
  const dateIteratee =
    (column: keyof T): Comparator<T> =>
    (record: T) => {
      const value = record[column];
      if (!isString(value) || !value) {
        return 0;
      }
      return new Date(value).getTime();
    };

  // Makes a list of iteratees, where each index iteratee is preceded by an iteratee that ensures blanks go last.
  const iteratees: (Comparator<T> | keyof T)[] = [];
  const orders: SortDir[] = [];
  indexSorts.forEach((indexSort) => {
    const { index, dir, isDate } = indexSort;
    iteratees.push(
      (o) => isEmptyValue(o[index]),
      isDate ? dateIteratee(index) : index
    );
    orders.push("asc", dir || "asc");
  });

  return orderBy(records, iteratees, orders);
}
