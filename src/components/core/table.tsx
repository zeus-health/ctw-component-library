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
  <div className={cx(className, "ctw-flex ctw-flex-col")}>
    <div className="-ctw-my-2 -ctw-mx-4 ctw-overflow-x-auto sm:-ctw-mx-6 lg:-ctw-mx-8">
      <div className="ctw-inline-block ctw-min-w-full ctw-py-2 ctw-align-middle md:ctw-px-6 lg:ctw-px-8">
        <div className="ctw-overflow-hidden ctw-shadow ctw-ring-1 ctw-ring-black ctw-ring-opacity-5 md:ctw-rounded-lg">
          <table className="ctw-min-w-full ctw-divide-y ctw-divide-gray-300">
            <thead className="ctw-bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.title ?? index}
                    scope="col"
                    className="ctw-px-3 ctw-py-3 ctw-text-left ctw-text-xs ctw-font-medium ctw-uppercase ctw-tracking-wider ctw-text-gray-500"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="ctw-divide-y ctw-divide-gray-200 ctw-bg-white">
              {records.map((record, recordIndex) => {
                const propsForClick = onClick
                  ? {
                      className: cx(
                        // Add bottom radius to last row to fix issue with focus ring.
                        // Otherwise the row's focus ring would get cutoff since the table is rounded.
                        {
                          "ctw-rounded-b-lg":
                            recordIndex === records.length - 1,
                        },
                        "ctw-cursor-pointer hover:ctw-bg-gray-50 ctw-ring-primary-500 focus-visible:ctw-ring-2 ctw-ring-inset ctw-outline-none"
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
                            "ctw-whitespace-nowrap ctw-px-3 ctw-py-4 ctw-text-sm",
                            index === 0
                              ? "ctw-font-medium ctw-text-gray-900"
                              : "ctw-text-gray-500"
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
