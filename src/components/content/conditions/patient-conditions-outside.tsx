import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { useToggleArchive } from "../hooks/use-toggle-archive";
import { PatientHistoryAction } from "../patient-history/patient-history-action";
import { RequestRecordsButton } from "../patient-history/request-records-button";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientConditionsOutside } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_OTHER_PROVIDER_CONDITIONS } from "@/utils/query-keys";

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

  const emptyMessage = !patientHistoryQuery.lastRetrievedAt ? (
    <div className="ctw-flex ctw-space-x-1">
      <div>Retrieve patient clinical history.</div>
      <RequestRecordsButton />
    </div>
  ) : undefined;

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
      emptyMessage={emptyMessage}
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
  const { isLoading, toggleArchive } = useToggleArchive(
    record,
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS
  );
  const archiveLabel = record.isArchived ? t("resourceTable.restore") : t("resourceTable.dismiss");

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        disabled={isLoading}
        onClick={toggleArchive}
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
