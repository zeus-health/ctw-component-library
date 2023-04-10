import cx from "classnames";
import { ReactElement, useRef } from "react";
import { usePatient } from "@/components/core/providers/patient-provider";
import { Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./resource-table.scss";

export type ResourceTableProps<T extends MinRecordItem> = {
  className?: string;
  columns: TableProps<T>["columns"];
  data: T[];
  emptyMessage?: string | ReactElement;
  isLoading: boolean;
  onRowClick?: TableProps<T>["handleRowClick"];
  rowActions?: TableProps<T>["RowActions"];
  showTableHead?: boolean;
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
  showTableHead,
}: ResourceTableProps<M>) => {
  const patient = usePatient();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const shouldShowTableHead =
    typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;
  const emptyMessageWithRequestRecords = patient.data ? (
    emptyMessage
  ) : (
    <div className="ctw-space-y-4">Patient not found.</div>
  );

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
        showTableHead={shouldShowTableHead}
        stacked={breakpoints.sm}
        emptyMessage={emptyMessageWithRequestRecords}
        isLoading={!!patient.data && isLoading}
        records={data}
        RowActions={rowActions}
        columns={columns}
        handleRowClick={onRowClick}
      />
    </div>
  );
};
