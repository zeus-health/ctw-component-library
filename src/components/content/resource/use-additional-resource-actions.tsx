import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useCTW } from "@/components/core/providers/use-ctw";
import { useRequestContext } from "@/components/core/providers/use-request-context";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_BASIC } from "@/utils/query-keys";

export type ResourceTableProps<T extends MinRecordItem> = {
  RowActions?: TableProps<T>["RowActions"];
  enableDismissAndReadActions?: boolean;
};

export const useAdditionalResourceActions = <T extends fhir4.Resource, M extends FHIRModel<T>>({
  RowActions,
  enableDismissAndReadActions,
}: ResourceTableProps<M>) => {
  const { featureFlags } = useCTW();
  const userBuilderId = useUserBuilderId();

  const DismissAndReadActions = enableDismissAndReadActions
    ? getDismissAndReadActions(userBuilderId)
    : undefined;

  return featureFlags?.enableViewFhirButton || RowActions || DismissAndReadActions
    ? ({ record, onSuccess }: RowActionsProps<M>) => {
        // We call these right away so we'll know if they return null and then
        // so should we. This helps consumers like ResourceDetailsDrawer know
        // whether or not the row actions are empty or not.
        const actions = RowActions && RowActions({ record, onSuccess });
        const extraActions = DismissAndReadActions && DismissAndReadActions({ record, onSuccess });
        if (!extraActions && !actions && !featureFlags?.enableViewFhirButton) return null;

        return (
          <div className="ctw-flex ctw-space-x-2">
            {featureFlags?.enableViewFhirButton && <ViewFHIR resource={record.resource} />}
            {extraActions}
            {actions}
          </div>
        );
      }
    : undefined;
};

const getDismissAndReadActions =
  (userBuilderId: string) =>
  ({ record, onSuccess }: RowActionsProps<FHIRModel<fhir4.Resource>>) => {
    const { t } = useBaseTranslations();
    const requestContext = useRequestContext();
    const { trackInteraction } = useAnalytics();

    const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(QUERY_KEY_BASIC);
    const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead();
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    // In production we want to avoid non-builder users from inadvertantly marking records as read
    // In lower environments this is allowed for demos/testing
    const disableReadButton =
      requestContext?.env === "production" && requestContext.userType !== "builder";

    return record.ownedByBuilder(userBuilderId) ? null : (
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isToggleDismissLoading || isToggleReadLoading}
          onClick={async () => {
            trackInteraction(record.isDismissed ? "restore_record" : "dismiss_record");
            await toggleDismiss(record);
            if (!record.isRead) {
              await toggleRead(record);
            }
            onSuccess?.();
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
          disabled={disableReadButton || isToggleDismissLoading || isToggleReadLoading}
          onClick={async () => {
            if (record.isRead) {
              trackInteraction("mark_record_as_unread");
            } else {
              trackInteraction("mark_record_as_read");
            }
            await toggleRead(record);
            onSuccess?.();
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
