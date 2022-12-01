import { ReactNode } from "react";
import { localeCompareBlankLast, SortDir } from "@/utils/sort";

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
    return sortByCols(records, sortColumn.sortIndices, sort.dir);
  }
  return records;
}

function sortByCols<T>(records: T[], indices: (keyof T)[], dir: SortDir) {
  return records.sort((a, b) => {
    let compareTotal = 0;
    for (let i = 0; i < indices.length; i += 1) {
      let compareChange =
        localeCompareBlankLast(`${a[indices[i]]}`, `${b[indices[i]]}`, "asc") *
        // The math below allows secondary, tertiary etc. sort indices.
        0.1 ** i;
      // Sort the primary index reversely if descending.
      if (i === 0 && dir === "desc") {
        compareChange = localeCompareBlankLast(
          a[indices[i]],
          b[indices[i]],
          "desc"
        );
      }
      compareTotal += compareChange;
    }
    return compareTotal;
  });
}
