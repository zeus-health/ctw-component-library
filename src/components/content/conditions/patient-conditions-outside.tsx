import { PatientHistoryAction } from "../patient-history/patient-history-action";
import { RequestRecordsButton } from "../patient-history/request-records-button";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { useHasOtherRecordData } from "./patient-conditions";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { RowActionsProps } from "@/components/core/table/table";
import { toggleArchive, usePatientConditionsOutside } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

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
  const showRequestRecordsRequestButtonQuery = useHasOtherRecordData();

  const emptyMessage = !patientHistoryQuery.lastRetrievedAt ? (
    <div className="ctw-flex ctw-space-x-1">
      <div>Retrieve patient clinical history.</div>
      <RequestRecordsButton />
    </div>
  ) : undefined;

  const action = (
    <PatientHistoryAction
      hideRequestRecords={
        (hideRequestRecords &&
          showRequestRecordsRequestButtonQuery.hasNoOutsideDataAndHasNeverRequestedPatientHistory) ||
        readOnly
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
  const showAddConditionForm = useAddConditionForm();
  const { getRequestContext } = useCTW();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async () => {
          await toggleArchive(record, await getRequestContext());
        }}
      >
        {record.isArchived ? "Restore" : "Dismiss"}
      </button>

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={() => showAddConditionForm(record)}
      >
        Add
      </button>
    </div>
  );
};
