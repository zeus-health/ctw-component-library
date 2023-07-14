import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { useToggleDismiss } from "../hooks/use-toggle-dismiss";
import { PatientHistoryAction } from "../patient-history/patient-history-action";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { usePatientConditionsOutside } from "@/services/conditions";
import { QUERY_KEY_BASIC, QUERY_KEY_OTHER_PROVIDER_CONDITIONS } from "@/utils/query-keys";

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

  const action = (
    <PatientHistoryAction
      hideRequestRecords={
        hideRequestRecords || hasNoOutsideDataAndHasNeverRequestedPatientHistory || readOnly
      }
    />
  );

  return (
    <PatientConditionsBase
      outside
      action={action}
      className={className}
      query={query}
      readOnly={readOnly}
      rowActions={readOnly ? undefined : RowActions}
      isLoading={patientHistoryQuery.isLoading}
    />
  );
};

export const PatientConditionsOutside = withErrorBoundary(
  PatientConditionsOutsideComponent,
  "PatientConditions"
);

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const { t } = useBaseTranslations();
  const showAddConditionForm = useAddConditionForm();
  const { isLoading, toggleDismiss } = useToggleDismiss(
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    QUERY_KEY_BASIC
  );
  const archiveLabel = record.isDismissed ? t("resourceTable.restore") : t("resourceTable.dismiss");

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        disabled={isLoading}
        onClick={() => {
          toggleDismiss(record);
        }}
      >
        {isLoading ? (
          <div className="ctw-flex">
            <Spinner className="ctw-mx-4 ctw-align-middle" />
          </div>
        ) : (
          archiveLabel
        )}
      </button>

      <button
        type="button"
        className="ctw-btn-primary"
        disabled={isLoading}
        onClick={() => showAddConditionForm(record)}
      >
        {t("resourceTable.add")}
      </button>
    </div>
  );
};
