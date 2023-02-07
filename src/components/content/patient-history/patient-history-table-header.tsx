import { formatISODateStringToDate } from "@/fhir/formatters";

export type PatientHistoryTableHeaderMessageProps = {
  patientHistory?: {
    openHistoryRequestDrawer: () => Promise<void>;
    lastRetrievedAt: string | undefined;
    lastStatus: string | undefined;
    dateCreatedAt: string | undefined;
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
