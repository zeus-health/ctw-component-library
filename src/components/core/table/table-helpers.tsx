import { ReactNode } from "react";

export interface MinRecordItem {
  id: string | number;
}

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
  className?: string;
  widthPercent?: number;
  minWidth?: number;
  sortIndex?: keyof T;
  sortFnOverride?: (a: T, b: T, dir: SortDir) => number;
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
  if (sort && sortColumn) {
    // May be given a function, or just a property to be sorted by alphanumerically.
    const sortFn =
      sortColumn.sortFnOverride ||
      (sortColumn.sortIndex &&
        ((a, b, dir) =>
          // Cast because sortIndex is a property of a and b.
          alphaSortBlankLast(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (a as any)[sortColumn.sortIndex],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (b as any)[sortColumn.sortIndex],
            dir
          )));
    if (sortFn) return records.sort((a, b) => sortFn(a, b, sort.dir));
  }
  return records;
}

export type SortDir = "asc" | "desc";

export type TableSort = { columnTitle: string; dir: SortDir };

export const alphaSortBlankLast = (
  a: string | undefined,
  b: string | undefined,
  dir: SortDir
) => {
  const aIsBlank = !a || a === "";
  const bIsBlank = !b || b === "";
  if (aIsBlank && bIsBlank) {
    return 0;
  }
  if (aIsBlank) {
    return 1;
  }
  if (bIsBlank) {
    return -1;
  }
  return dir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
};
