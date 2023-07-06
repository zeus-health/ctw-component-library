import cx from "classnames";
import { ReactElement, useEffect, useRef, useState } from "react";
import { AuthError } from "@/components/core/auth-error";
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
  const [userBuilderId, setUserBuilderId] = useState("");

  const shouldShowTableHead = typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  // Use correct empty message when there are auth errors or failure fetching patient data.
  let emptyMessage2 = emptyMessage;
  if (
    patient.error &&
    typeof patient.error === "object" &&
    "status" in patient.error &&
    patient.error.status === 401
  ) {
    emptyMessage2 = <AuthError />;
  } else if (!patient.data) {
    emptyMessage2 = <div className="ctw-space-y-4">Patient not found.</div>;
  }

  // We're loading, if our patient is loading OR
  // if we have our patient data but the passed in isLoading is true.
  // We have to check for patient.data because most queries are only
  // enabled when we have a patient UPID, without one, those queries
  // will stay in the loading state forever.
  const isLoading2 = patient.isLoading || (!!patient.data && isLoading);

  return (
    <div
      ref={containerRef}
      className={cx(className, "ctw-scrollable-pass-through-height ctw-resource-table")}
    >
      <Table
        getRowClassName={(record) => ({
          "ctw-tr-dismissed": record.isDismissed,
          "ctw-tr-unread":
            boldUnreadRows && !record.ownedByBuilder(userBuilderId) && !record.isRead,
        })}
        showTableHead={shouldShowTableHead}
        stacked={breakpoints.sm}
        emptyMessage={emptyMessage2}
        isLoading={isLoading2}
        records={data}
        RowActions={rowActions}
        columns={columns}
        handleRowClick={onRowClick}
      />
    </div>
  );
};
