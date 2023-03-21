import cx from "classnames";
import { useRef } from "react";
import { Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./resource-table.scss";

export type ResourceTableProps<T extends MinRecordItem> = {
  className?: string;
  columns: TableProps<T>["columns"];
  data: T[];
  emptyMessage?: string;
  isLoading: boolean;
  onRowClick?: TableProps<T>["handleRowClick"];
  rowActions?: TableProps<T>["RowActions"];
};

export const ResourceTable = <
  T extends fhir4.Resource,
  M extends FHIRModel<T>
>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading,
  onRowClick,
  rowActions,
}: ResourceTableProps<M>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);

  return (
    <div
      ref={containerRef}
      className={cx(
        className,
        "ctw-scrollable-pass-through-height ctw-resource-table"
      )}
    >
      <Table
        getRowClassName={(record) => ({
          "ctw-tr-archived": record.isArchived,
        })}
        showTableHead={!breakpoints.sm}
        stacked={breakpoints.sm}
        emptyMessage={emptyMessage}
        isLoading={isLoading}
        records={data}
        RowActions={rowActions}
        columns={columns}
        handleRowClick={onRowClick}
      />
    </div>
  );
};
