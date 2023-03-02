import { Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";

export type ResourceTableProps<T extends MinRecordItem> = {
  className?: string;
  columns: TableProps<T>["columns"];
  data: T[];
  emptyMessage?: string;
  isLoading: boolean;
  onRowClick?: TableProps<T>["handleRowClick"];
  rowActions?: TableProps<T>["RowActions"];
  stacked?: TableProps<T>["stacked"];
};

export const ResourceTable = <T extends MinRecordItem>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading,
  onRowClick,
  rowActions,
  stacked,
}: ResourceTableProps<T>) => (
  <div className={className}>
    <Table
      stacked={stacked}
      removeLeftAndRightBorders
      className="-ctw-mx-px !ctw-rounded-none"
      emptyMessage={emptyMessage}
      isLoading={isLoading}
      records={data}
      RowActions={rowActions}
      columns={columns}
      handleRowClick={onRowClick}
    />
  </div>
);
