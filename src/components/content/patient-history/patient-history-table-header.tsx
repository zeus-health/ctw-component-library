import { formatISODateStringToDate } from "@/fhir/formatters";

export type PatientHistoryTableHeaderMessageProps = {
  patientHistory?: {
    openHistoryRequestDrawer: () => Promise<void>;
    lastRetrievedAt?: string;
    lastStatus?: string;
    dateCreatedAt?: string;
  };
  message?: string;
};

export const PatientHistoryTableHeaderMessage = ({
  patientHistory,
  message,
}: PatientHistoryTableHeaderMessageProps) => {
  switch (patientHistory?.lastStatus) {
    case "in_progress":
      return (
        <div className="ctw-text-sm ctw-italic ctw-text-black">
          {message} {formatISODateStringToDate(patientHistory.lastRetrievedAt)}
        </div>
      );
    default:
      return null;
  }
};
