import { useRef } from "react";
import cx from "classnames";
import { Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { FHIRModel } from "@/fhir/models/fhir-model";
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
    <div className={cx(className, "ctw-resource-table")} ref={containerRef}>
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
