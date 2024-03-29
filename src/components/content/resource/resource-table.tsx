import cx from "classnames";
import { ReactElement, ReactNode, useRef } from "react";
import { useAdditionalResourceActions } from "./use-additional-resource-actions";
import { useToggleRead } from "../hooks/use-toggle-read";
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
  isLoading?: boolean;
  onRowClick?: TableProps<T>["handleRowClick"];
  rowActions?: (r: T) => TableProps<T>["rowActions"];
  showTableHead?: boolean;
  enableDismissAndReadActions?: boolean;
  hidePagination?: boolean;
  children?: ReactNode;
  queryKey?: string;
};

export const ResourceTable = <T extends fhir4.Resource, M extends FHIRModel<T>>({
  className,
  columns,
  data,
  emptyMessage,
  isLoading = false,
  onRowClick,
  rowActions,
  showTableHead,
  enableDismissAndReadActions,
  hidePagination = false,
  children,
  queryKey,
}: ResourceTableProps<M>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const userBuilderId = useUserBuilderId();

  const shouldShowTableHead = typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;

  const { toggleRead } = useToggleRead();

  // Create the RowActions react node
  const RowActionsWithAdditions = useAdditionalResourceActions({
    rowActions,
    enableDismissAndReadActions,
    queryKey,
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
        emptyMessage={emptyMessage}
        isLoading={isLoading}
        records={data}
        RowActions={RowActionsWithAdditions}
        columns={columns}
        handleRowClick={onRowClickWithRead}
        hidePagination={hidePagination}
      >
        {children}
      </Table>
    </div>
  );
};
