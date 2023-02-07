import { PatientHistoryTableHeaderMessage } from "../patient-history/patient-history-table-header";
import { usePatientHistory } from "../patient-history/use-patient-history";
import { useAddConditionForm } from "./condition-hooks";
import { Toggle } from "@/components/core/toggle";

export type PatientConditionsActionsProps = {
  hideAdd: boolean;
  onToggleShowHistoric: () => void;
};

export function PatientConditionsActions({
  hideAdd,
  onToggleShowHistoric,
}: PatientConditionsActionsProps) {
  const showAddConditionForm = useAddConditionForm();
  const patientHistory = usePatientHistory();

  return (
    <div className="ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-p-3">
      {patientHistory.lastRetrievedAt && hideAdd && (
        <PatientHistoryTableHeaderMessage
          patientHistory={patientHistory}
          message="Last Retrieved"
        />
      )}
      <Toggle name="historic" text="Historic" onChange={onToggleShowHistoric} />
      {!hideAdd && (
        <button
          type="button"
          className="ctw-btn-primary"
          onClick={() => showAddConditionForm()}
        >
          Add Condition
        </button>
      )}
    </div>
  );
}
