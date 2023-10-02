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

  let { lastRetrievedAt } = patientHistory;

  // if this is a test patient with no last retrieved date then just show today
  if (!lastRetrievedAt && patient.data?.isTestPatient) {
    lastRetrievedAt = Date.now();
  }

  if (lastRetrievedAt) {
    return (
      <div className="ctw-space-x-1 ctw-text-sm ctw-italic ctw-text-black">
        <span>Records last retrieved</span>
        <span>{formatISODateStringToDate(lastRetrievedAt)}</span>
      </div>
    );
  }

  return (
    <div className="ctw-space-x-1 ctw-text-sm ctw-italic ctw-text-black">
      <FontAwesomeIcon icon={faRotate} className="ctw-h-3" />
      <span>Records never requested</span>
    </div>
  );
};
