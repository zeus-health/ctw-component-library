import cx from "classnames";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { AuthError } from "@/components/core/auth-error";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
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
  queryKeyToInvalidateOnReadDismiss?: string;
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
  queryKeyToInvalidateOnReadDismiss,
}: ResourceTableProps<M>) => {
  const patient = usePatient();
  const { getRequestContext, featureFlags } = useCTW();
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

  const queryKeysToInvalidate = [QUERY_KEY_BASIC];
  if (queryKeyToInvalidateOnReadDismiss) {
    queryKeysToInvalidate.push(queryKeyToInvalidateOnReadDismiss);
  }
  const { toggleRead } = useToggleRead(...queryKeysToInvalidate);

  const onRowClickWithRead =
    onRowClick || enableDismissAndReadActions
      ? (record: M) => {
          if (!record.isRead && enableDismissAndReadActions) {
            toggleRead(record);
          }
          if (onRowClick) {
            onRowClick(record);
          }
        }
      : undefined;

  const DismissAndReadActions =
    enableDismissAndReadActions && data.length > 0
      ? getDismissAndReadActions(userBuilderId, queryKeyToInvalidateOnReadDismiss)
      : undefined;

  const allRowActions =
    featureFlags?.enableViewFhirButton || RowActions || enableDismissAndReadActions
      ? ({ record }: RowActionsProps<M>) => (
          <div className="ctw-flex ctw-space-x-2">
            {featureFlags?.enableViewFhirButton && <ViewFHIR resource={record.resource} />}
            {RowActions && <RowActions record={record} />}
            {DismissAndReadActions && <DismissAndReadActions record={record} />}
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
          "ctw-tr-dismissed": enableDismissAndReadActions && record.isDismissed,
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
  (userBuilderId: string, queryKeyToInvalidate?: string) =>
  ({ record }: RowActionsProps<FHIRModel<fhir4.Resource>>) => {
    const { t } = useBaseTranslations();

    const queryKeysToInvalidate = [QUERY_KEY_BASIC];
    if (queryKeyToInvalidate) {
      queryKeysToInvalidate.push(queryKeyToInvalidate);
    }

    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(
      ...queryKeysToInvalidate
    );
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead(...queryKeysToInvalidate);
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
