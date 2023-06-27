import cx from "classnames";
import { ReactElement, useEffect, useRef, useState } from "react";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
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
  boldUnreadRows?: boolean;
};

export const ResourceTable = <T extends fhir4.Resource, M extends FHIRModel<T>>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading,
  onRowClick,
  rowActions,
  showTableHead,
  boldUnreadRows,
}: ResourceTableProps<M>) => {
  const patient = usePatient();
  const { getRequestContext } = useCTW();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const shouldShowTableHead = typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;
  const emptyMessageWithRequestRecords = patient.data ? (
    emptyMessage
  ) : (
    <div className="ctw-space-y-4">Patient not found.</div>
  );

  const [userBuilderId, setUserBuilderId] = useState<string>("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  return (
    <div
      ref={containerRef}
      className={cx(className, "ctw-scrollable-pass-through-height ctw-resource-table")}
    >
      <Table
        getRowClassName={(record) => ({
          "ctw-tr-archived": record.isArchived,
          "ctw-tr-unread":
            boldUnreadRows && !record.ownedByBuilder(userBuilderId) && !record.isRead,
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
