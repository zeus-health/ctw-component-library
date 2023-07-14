import cx from "classnames";
import { ReactElement, useRef } from "react";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { AuthError } from "@/components/core/auth-error";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps, Table, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import "./resource-table.scss";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_BASIC } from "@/utils/query-keys";

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
}: ResourceTableProps<M>) => {
  const patient = usePatient();
  const { featureFlags } = useCTW();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const userBuilderId = useUserBuilderId();

  const shouldShowTableHead = typeof showTableHead === "boolean" ? showTableHead : !breakpoints.sm;

  const { toggleRead } = useToggleRead();

  const onRowClickWithRead = onRowClick
    ? (record: M) => {
        if (!record.isRead && enableDismissAndReadActions) {
          toggleRead(record);
        }
        onRowClick(record);
      }
    : undefined;

  const DismissAndReadActions = enableDismissAndReadActions
    ? getDismissAndReadActions(userBuilderId)
    : undefined;

  const allRowActions =
    featureFlags?.enableViewFhirButton || RowActions || enableDismissAndReadActions
      ? ({ record }: RowActionsProps<M>) => (
          <div className="ctw-flex ctw-space-x-2">
            {featureFlags?.enableViewFhirButton && <ViewFHIR resource={record.resource} />}
            {DismissAndReadActions && <DismissAndReadActions record={record} />}
            {RowActions && <RowActions record={record} />}
          </div>
        )
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
        RowActions={allRowActions}
        columns={columns}
        handleRowClick={onRowClickWithRead}
      />
    </div>
  );
};

const getDismissAndReadActions =
  (userBuilderId: string) =>
  ({ record }: RowActionsProps<FHIRModel<fhir4.Resource>>) => {
    const { t } = useBaseTranslations();

    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(QUERY_KEY_BASIC);
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead();
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    return record.ownedByBuilder(userBuilderId) ? (
      <></>
    ) : (
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={() => {
            toggleDismiss(record);
            if (!record.isRead) {
              toggleRead(record);
            }
          }}
        >
          {isToggleDismissLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            archiveLabel
          )}
        </button>
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={() => {
            toggleRead(record);
          }}
        >
          {isToggleReadLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            readLabel
          )}
        </button>
      </div>
    );
  };
