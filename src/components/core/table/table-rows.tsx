import cx from "classnames";
import { FunctionComponent, ReactElement } from "react";
import { TableDataCell } from "./table-data-cell";
import { TableFullLengthRow } from "./table-full-length-row";
import { MinRecordItem, TableColumn } from "./table-helpers";
import { Spinner } from "../spinner";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { RowActionsProps } from "@/components/core/table/table";
import { isFunction } from "@/utils/nodash";

export type RowActionsProp<T extends MinRecordItem> = FunctionComponent<RowActionsProps<T>>;

export type RowActionsConfigProp<T extends MinRecordItem> =
  | {
      text: string;
      onClick: (record: T, onSuccess?: () => void) => void;
      className: cx.Argument;
      disabled?: boolean;
      testId?: string;
      render?: RowActionsProp<T>;
    }[]
  | undefined;

export type TableRowsProps<T extends MinRecordItem> = {
  RowActions?: RowActionsProp<T>;
  rowActions?: RowActionsConfigProp<T>;
  columns: TableColumn<T>[];
  emptyMessage: string | ReactElement;
  getRowClassName?: (record: T) => cx.Argument;
  handleRowClick?: (record: T) => void;
  isLoading: boolean;
  records: T[];
  stacked: boolean;
};

export const TableRows = <T extends MinRecordItem>({
  records,
  columns,
  isLoading,
  emptyMessage,
  handleRowClick,
  RowActions,
  getRowClassName,
  stacked,
}: TableRowsProps<T>) => {
  const { trackInteraction } = useAnalytics();

  if (isLoading) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        <div className="ctw-flex ctw-justify-center ctw-space-x-2">
          <span>Loading...</span>
          <Spinner />
        </div>
      </TableFullLengthRow>
    );
  }

  if (records.length === 0) {
    return (
      <TableFullLengthRow colSpan={columns.length}>
        <span className="ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0">{emptyMessage}</span>
      </TableFullLengthRow>
    );
  }

  return (
    <>
      {records.map((record) => (
        <tr
          // ctw-mx-px fixes bug where side borders disappear on hover when stacked.
          className={cx(
            "ctw-group ctw-relative ctw-mx-px",
            isFunction(getRowClassName) ? getRowClassName(record) : "",
            {
              "ctw-cursor-pointer hover:ctw-bg-bg-lighter": isFunction(handleRowClick),
            }
          )}
          key={record.key}
          onClick={({ target }) => {
            // This is for the case where a user clicks area near the button (but not on), we do not want have the onRowClick handler trigger as that will cause confusion to the user.
            if (target instanceof HTMLElement && target.querySelectorAll("button").length) {
              return;
            }

            if (handleRowClick) {
              handleRowClick(record);
              trackInteraction("click_row");
            }
          }}
        >
          {columns.map((column, index) => (
            <TableDataCell
              key={`${record.key}_${column.title ?? index}`}
              column={column}
              record={record}
            />
          ))}
          {RowActions && (
            // Add onClick here to prevent clicks from propagating to
            // the to the tr's onClick for onRowClick.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <td
              className="ctw-table-row-actions group-hover:ctw-visible"
              onClick={(event) => event.stopPropagation()}
            >
              <RowActions record={record} stacked={stacked} />
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
