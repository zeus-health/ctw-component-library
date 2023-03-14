import { PatientHistoryTableHeaderMessage } from "./patient-history-table-header";
import { usePatientHistory } from "./use-patient-history";

export const PatientHistoryLastRetrieved = () => {
  const patientHistory = usePatientHistory();

  return (
    <>
      {patientHistory.lastRetrievedAt && (
        <PatientHistoryTableHeaderMessage
          patientHistory={patientHistory}
          message="Last Retrieved"
        />
      )}
    </>
  );
};
