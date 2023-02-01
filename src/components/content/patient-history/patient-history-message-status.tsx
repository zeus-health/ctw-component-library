import { ProgressIcon } from "@/components/core/progress-icon";
import { formatISODateStringToDate } from "@/fhir/formatters";

export type PatientHistoryStatusProps = {
  status?: string;
  date?: string;
};

export const PatientHistoryStatus = ({
  status,
  date,
}: PatientHistoryStatusProps) => {
  switch (status) {
    case "initialize":
    case "in_progress":
      return (
        <div className="ctw-alert-bg ctw-rounded-md ctw-bg-caution-bg">
          <ProgressIcon className="ctw-h-5 ctw-flex-none ctw-fill-caution-icon" />
          <div className="ctw-text-caution-message">
            In Progress - request received {formatISODateStringToDate(date)}
          </div>
        </div>
      );
    case "done":
    case "error":
    default:
      return null;
  }
};
