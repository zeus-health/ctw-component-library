import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { PatientHistoryLastRetrievedWithAction } from "../patient-history/patient-history-action";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { Spinner } from "@/components/core/spinner";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { usePatientConditionsOutside } from "@/services/conditions";
import { QUERY_KEY_PATIENT_SUMMARY_CONDITIONS } from "@/utils/query-keys";

export type PatientConditionsOutsideProps = {
  className?: string;
  hideRequestRecords?: boolean;
  readOnly?: boolean;
};

const PatientConditionsOutsideComponent = ({
  className,
  hideRequestRecords = false,
  readOnly = false,
}: PatientConditionsOutsideProps) => {
  const query = usePatientConditionsOutside();
  const patientHistoryQuery = usePatientHistory();
  const hasNoOutsideDataAndHasNeverRequestedPatientHistory =
    patientHistoryQuery.lastRetrievedAt === undefined && query.data.length === 0;

  const rowActions = useRowActions();
  const action = (
    <PatientHistoryLastRetrievedWithAction
      hideRequestRecords={
        hideRequestRecords || hasNoOutsideDataAndHasNeverRequestedPatientHistory || readOnly
      }
    />
  );

  return (
    <AnalyticsProvider componentName="PatientConditionsOutside">
      <PatientConditionsBase
        outside
        action={action}
        className={className}
        query={query}
        readOnly={readOnly}
        rowActions={readOnly ? undefined : rowActions}
        isLoading={patientHistoryQuery.isLoading}
      />
    </AnalyticsProvider>
  );
};

export const PatientConditionsOutside = withErrorBoundary(
  PatientConditionsOutsideComponent,
  "PatientConditions"
);

function useRowActions(): (r: ConditionModel) => RowActionsConfigProp<ConditionModel> {
  const { t } = useBaseTranslations();
  const showAddConditionForm = useAddConditionForm();
  const { isLoading, toggleDismiss } = useToggleDismiss(QUERY_KEY_PATIENT_SUMMARY_CONDITIONS);

  return (record: ConditionModel): RowActionsConfigProp<ConditionModel> => {
    const archiveLabel = record.isDismissed
      ? t("resourceTable.restore")
      : t("resourceTable.dismiss");
    return [
      {
        text: archiveLabel,
        className: "ctw-btn-default",
        onClick: async () => {
          await toggleDismiss(record);
        },
        disabled: isLoading,
        render() {
          return (
            <div className="ctw-flex">
              {isLoading ? <Spinner className="ctw-mx-4 ctw-align-middle" /> : archiveLabel}
            </div>
          );
        },
      },
      {
        text: t("resourceTable.add"),
        className: "ctw-btn-primary",
        disabled: isLoading,
        onClick: () => showAddConditionForm(record),
      },
    ];
  };
}
