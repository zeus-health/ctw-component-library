import cx from "classnames";
import { ReactElement, useRef } from "react";
import { useAdditionalResourceActions } from "./use-additional-resource-actions";
import { useToggleRead } from "../hooks/use-toggle-read";
import { AuthError } from "@/components/core/auth-error";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
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
  RowActions?: TableProps<T>["RowActions"];
  showTableHead?: boolean;
  enableDismissAndReadActions?: boolean;
  hidePagination?: boolean;
};

export const ResourceTable = <T extends fhir4.Resource, M extends FHIRModel<T>>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading,
  onRowClick,
  RowActions,
  showTableHead,
  enableDismissAndReadActions,
  hidePagination = false,
}: ResourceTableProps<M>) => {
  const patient = usePatient();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const userBuilderId = useUserBuilderId();

  const shouldShowTableHead = typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;

  const { toggleRead } = useToggleRead();

  const RowActionsWithAdditions = useAdditionalResourceActions({
    RowActions,
    enableDismissAndReadActions,
  });

  const onRowClickWithRead = onRowClick
    ? async (record: M) => {
        if (
          !record.isRead &&
          enableDismissAndReadActions &&
          !record.ownedByBuilder(userBuilderId)
        ) {
          void toggleRead(record);
        }
        onRowClick(record);
      }
    : undefined;

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
            enableDismissAndReadActions && !record.ownedByBuilder(userBuilderId) && !record.isRead,
        })}
        showTableHead={shouldShowTableHead}
        stacked={breakpoints.sm}
        emptyMessage={emptyMessage2}
        isLoading={isLoading2}
        records={data}
        RowActions={RowActionsWithAdditions}
        columns={columns}
        handleRowClick={onRowClickWithRead}
        hidePagination={hidePagination}
      />
    </div>
  );
};
