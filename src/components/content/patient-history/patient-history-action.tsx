import { PatientHistoryTableHeaderMessage } from "./patient-history-table-header";
import { RequestRecordsButton } from "./request-records-button";
import { usePatientHistory } from "./use-patient-history";

export type PatientHistoryActionProps = {
  hideRequestRecords: boolean;
};

export const PatientHistoryAction = ({
  hideRequestRecords = false,
}: PatientHistoryActionProps) => {
  const patientHistory = usePatientHistory();

  return (
    <div>
      {patientHistory.lastRetrievedAt && (
        <PatientHistoryTableHeaderMessage
          patientHistory={patientHistory}
          message="Last Retrieved"
        />
      )}

      {!hideRequestRecords && <RequestRecordsButton />}
    </div>
  );
};
