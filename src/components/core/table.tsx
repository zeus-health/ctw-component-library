import cx from "classnames";
import type { KeyboardEvent, ReactNode } from "react";

interface MinRecordItem {
  id: string | number;
}

type DataIndexSpecified<T> = { dataIndex: keyof T; render?: never };
type RenderSpecified<T> = { dataIndex?: never; render: (row: T) => ReactNode };

// A table column has an optional title
// and then either a dataIndex or a render method but not both.
export type TableColumn<T extends MinRecordItem> = {
  title?: string;
} & (DataIndexSpecified<T> | RenderSpecified<T>);

// Set of props that are optional configurations for the table.
export type TableOptionProps<T> = {
  className?: string;
  onClick?: (row: T) => void; // Adds a row hover effect and calls onClick.
};

export type TableProps<T extends MinRecordItem> = {
  records: T[];
  columns: TableColumn<T>[];
} & TableOptionProps<T>;

export const Table = <T extends MinRecordItem>({
  columns,
  records,
  className,
  onClick,
}: TableProps<T>) => (
  <div className={cx(className, "flex flex-col")}>
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.title ?? index}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {records.map((record, recordIndex) => {
                const propsForClick = onClick
                  ? {
                      className: cx(
                        // Add bottom radius to last row to fix issue with focus ring.
                        // Otherwise the row's focus ring would get cutoff since the table is rounded.
                        { "rounded-b-lg": recordIndex === records.length - 1 },
                        "cursor-pointer hover:bg-gray-50 ring-primary-500 focus-visible:ring-2 ring-inset outline-none"
                      ),
                      tabIndex: 0,
                      onKeyUp: (event: KeyboardEvent<HTMLTableRowElement>) => {
                        if (event.key === "Enter") {
                          onClick(record);
                        }
                      },
                      onClick: () => onClick(record),
                    }
                  : {};

                return (
                  <tr key={record.id} {...propsForClick}>
                    {columns.map((column, index) => {
                      const value = column.dataIndex
                        ? (record[column.dataIndex] as unknown as ReactNode)
                        : undefined;

                      return (
                        <td
                          key={column.title ?? index}
                          className={cx(
                            "whitespace-nowrap px-3 py-4 text-sm",
                            index === 0
                              ? "font-medium text-gray-900"
                              : "text-gray-500"
                          )}
                        >
                          {column.render ? column.render(record) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
