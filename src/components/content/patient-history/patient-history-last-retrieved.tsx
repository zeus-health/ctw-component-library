import { usePatientHistory } from "./use-patient-history";
import { formatISODateStringToDate } from "@/fhir/formatters";

export const PatientHistoryLastRetrieved = () => {
  const patientHistory = usePatientHistory();

  return (
    <>
      {patientHistory.lastRetrievedAt && (
        <div className="ctw-text-sm ctw-italic ctw-text-black">
          Last Retrieved
          {formatISODateStringToDate(patientHistory.lastRetrievedAt)}
        </div>
      )}
    </>
  );
};
