import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import cx from "classnames";
import type { MinRecordItem, SortDir, TableColumn } from "./table";

type SortChevronProps = {
  sortOrder?: "desc" | "asc";
};

const SortChevron = ({ sortOrder }: SortChevronProps) => {
  const sharedClasses = "ctw-text-gray-900 ctw-h-4";
  const activeClasses = cx(sharedClasses, "ctw-opacity-100");

  switch (sortOrder) {
    case "desc":
      return <ChevronUpIcon className={activeClasses} />;
    case "asc":
      return <ChevronDownIcon className={activeClasses} />;
    default:
      return (
        <ChevronDownIcon
          className={cx(
            sharedClasses,
            "ctw-opacity-40 group-hover:ctw-opacity-70"
          )}
        />
      );
  }
};

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
  sortColumn?: string;
  onSort?: (sortColumn: string) => void;
  sortOrder?: SortDir;
};

export const TableHead = <T extends MinRecordItem>({
  columns,
  sortColumn,
  sortOrder,
  onSort,
}: TableHeadProps<T>) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th
          className={cx("ctw-group", column.sortFn && "ctw-cursor-pointer")}
          key={column.title ?? index}
          scope="col"
          onClick={() => column.sortFn && onSort && onSort(column.title || "")}
        >
          <div className="ctw-flex ctw-items-center ctw-space-x-2">
            <div>{column.title}</div>
            {column.sortFn && (
              <SortChevron
                sortOrder={sortColumn === column.title ? sortOrder : undefined}
              />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);
