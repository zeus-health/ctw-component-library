import { usePatientHistory } from "./use-patient-history";

export const PatientHistoryLastRetrieved = () => {
  const patientHistory = usePatientHistory();

  return (
    <>
      {patientHistory.lastRetrievedAt && (
        <div className="ctw-text-sm ctw-italic ctw-text-black">
          Last Retrieved {patientHistory.lastRetrievedAt}
        </div>
      )}
    </>
  );
};
