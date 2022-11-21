import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import cx from "classnames";
import type { MinRecordItem, SortDir, TableColumn, TableSort } from "./table";

type SortChevronProps = {
  sortOrder?: SortDir;
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
            "ctw-opacity-0 group-hover:ctw-opacity-100"
          )}
        />
      );
  }
};

export type TableHeadProps<T extends MinRecordItem> = {
  columns: TableColumn<T>[];
  sort?: TableSort;
  onSort?: (sortColumn: string) => void;
};

export const TableHead = <T extends MinRecordItem>({
  columns,
  sort,
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
                sortOrder={
                  sort?.columnTitle === column.title ? sort?.dir : undefined
                }
              />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);
