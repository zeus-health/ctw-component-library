import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePatientHistory } from "./use-patient-history";
import { formatISODateStringToDate } from "@/fhir/formatters";
import { usePatient } from "@/index";

export const PatientHistoryLastRetrieved = () => {
  const patientHistory = usePatientHistory();
  const patient = usePatient();

  if (patient.isLoading || patientHistory.isLoading) {
    return <div />;
  }

  const { lastRetrievedAt } = patientHistory;

  if (lastRetrievedAt) {
    return (
      <div className="ctw-space-x-1 ctw-text-sm ctw-italic ctw-text-black">
        <span>Last Retrieved</span>
        <span>{formatISODateStringToDate(patientHistory.lastRetrievedAt)}</span>
      </div>
    );
  }

  // if this is a test patient, don't show the "records never requested" as it's confusing
  // to the end user
  if (!lastRetrievedAt && patient.data?.isTestPatient) {
    return <div />;
  }

  return (
    <div className="ctw-space-x-1 ctw-text-sm ctw-italic ctw-text-black">
      <FontAwesomeIcon icon={faRotate} className="ctw-h-3" />
      <span>Records never requested</span>
    </div>
  );
};
