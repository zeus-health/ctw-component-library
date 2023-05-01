import { usePatientHistory } from "./use-patient-history";
import { formatISODateStringToDate } from "@/fhir/formatters";

export const PatientHistoryLastRetrieved = () => {
  const patientHistory = usePatientHistory();

  return (
    <>
      {patientHistory.lastRetrievedAt && (
        <div className="ctw-space-x-1 ctw-text-sm ctw-italic ctw-text-black">
          <span>Last Retrieved</span>
          <span>{formatISODateStringToDate(patientHistory.lastRetrievedAt)}</span>
        </div>
      )}
    </>
  );
};
