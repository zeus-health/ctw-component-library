import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { Resource } from "fhir/r4";
import { useState } from "react";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { useToggleRead } from "../hooks/use-toggle-read";
import { DropdownMenuSimple } from "@/components/core/dropdown-menu-simple";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useCTW } from "@/components/core/providers/use-ctw";
import { useRequestContext } from "@/components/core/providers/use-request-context";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps, TableProps } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { ViewFHIR } from "@/components/core/view-fhir";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { useBaseTranslations } from "@/i18n";

export type ResourceTableProps<T extends MinRecordItem> = {
  rowActions?: (r: T) => TableProps<T>["rowActions"];
  enableDismissAndReadActions?: boolean;
  // Will adjust the way the dropdown menu appears if the content will be rendered in a footer
  isInFooter?: boolean;
  queryKey?: string;
};

export const useAdditionalResourceActions = <T extends Resource, M extends FHIRModel<T>>({
  rowActions,
  enableDismissAndReadActions,
  isInFooter = false,
  queryKey,
}: ResourceTableProps<M>) => {
  const { featureFlags } = useCTW();
  const [selectedAction, setSelectedAction] = useState("card");
  const dismissAndReadActions = useDismissAndReadActions(enableDismissAndReadActions, queryKey);

  return ({ record, onSuccess, stacked = false }: RowActionsProps<M>) => {
    const extraActions = dismissAndReadActions(record) ?? [];
    const actions = rowActions?.(record) ?? [];
    const combinedActions = [...extraActions, ...actions];
    if (!combinedActions.length && !featureFlags?.enableViewFhirButton) return null;

    if (stacked) {
      return (
        <div className="ctw-flex ctw-space-x-2">
          {featureFlags?.enableViewFhirButton && <ViewFHIR resource={record.resource} />}
          {combinedActions.length > 0 && (
            <DropdownMenuSimple
              align="end"
              buttonClassName={cx("ctw-bg-transparent ctw-border-none ctw-bg-blue ctw-p-0")}
              onItemSelect={(item) => {
                const selectedOption = combinedActions.filter(
                  (action) => action.text === item.key
                )[0];
                setSelectedAction(selectedOption.text);
                setTimeout(() => {
                  // This is a hack to make sure the dropdown menu closes before the action is executed to avoid
                  // react state updates on unmounted components
                  selectedOption.onClick(record, onSuccess);
                }, 1);
              }}
              items={combinedActions.map((item) => ({
                key: item.text,
                name: item.text,
                isSelected: selectedAction === item.text,
                disabled: item.disabled,
              }))}
            >
              <div className="ctw-btn-primary ctw-flex ctw-items-center ctw-space-x-2 !ctw-py-0 ctw-font-normal">
                <span className="!ctw-border-r-1 ctw-mr-1.5 ctw-divide-bg-light ctw-border-0 ctw-border-solid ctw-py-2 ctw-pr-4 !ctw-text-white">
                  select action
                </span>
                <FontAwesomeIcon
                  icon={isInFooter ? faChevronUp : faChevronDown}
                  className="ctw-w-2 !ctw-text-white"
                />
              </div>
            </DropdownMenuSimple>
          )}
        </div>
      );
    }

    return (
      <div className="ctw-flex ctw-space-x-2">
        {featureFlags?.enableViewFhirButton && <ViewFHIR resource={record.resource} />}
        {combinedActions.map(({ text, testId, onClick, disabled = false, className, render }) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            className={cx(className)}
            data-testid={testId}
            onClick={() => {
              onClick(record, onSuccess);
            }}
          >
            {render?.({ record, onSuccess, stacked }) ?? text}
          </button>
        ))}
      </div>
    );
  };
};

function useDismissAndReadActions(enableDismissAndReadActions = false, queryKey?: string) {
  const userBuilderId = useUserBuilderId();
  const { t } = useBaseTranslations();
  const requestContext = useRequestContext();
  const { trackInteraction } = useAnalytics();

  const { isLoading: isToggleDismissLoading, toggleDismiss } = useToggleDismiss(queryKey);
  const { isLoading: isToggleReadLoading, toggleRead } = useToggleRead(queryKey);
  return (record: FHIRModel<Resource>): RowActionsConfigProp<FHIRModel<Resource>> => {
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    // In production, we want to avoid non-builder users from inadvertently marking records as read
    // In lower environments this is allowed for demos/testing
    const disableReadButton =
      requestContext?.env === "production" && requestContext.userType !== "builder";
    if (!enableDismissAndReadActions || record.ownedByBuilder(userBuilderId)) {
      return [];
    }
    return [
      {
        className: "ctw-btn-default",
        disabled: isToggleDismissLoading || isToggleReadLoading,
        text: archiveLabel,
        onClick: async () => {
          trackInteraction("toggle_record_archive", {
            action: record.isDismissed ? "restore" : "dismiss",
          });
          await toggleDismiss(record);
          if (!record.isRead) {
            await toggleRead(record);
          }
        },
        render() {
          return (
            <div className="ctw-flex">
              {isToggleDismissLoading && <Spinner className="ctw-mx-4 ctw-align-middle" />}
              {!isToggleDismissLoading && archiveLabel}
            </div>
          );
        },
      },
      {
        className: "ctw-btn-default",
        disabled: disableReadButton || isToggleDismissLoading || isToggleReadLoading,
        text: readLabel,
        onClick: async () => {
          if (record.isRead) {
            trackInteraction("toggle_record_read", { action: "mark_as_unread" });
          } else {
            trackInteraction("toggle_record_read", { action: "mark_as_read" });
          }
          await toggleRead(record);
        },
        render() {
          return (
            <div className="ctw-flex">
              {isToggleReadLoading && <Spinner className="ctw-mx-4 ctw-align-middle" />}
              {!isToggleReadLoading && readLabel}
            </div>
          );
        },
      },
    ];
  };
}
