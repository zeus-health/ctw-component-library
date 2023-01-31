import { LoadingIcon } from "@/components/core/loading-icon";
import { formatStringISOtoDate } from "@/fhir/formatters";

export type PatientHistoryStatusProps = {
  status: string;
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
          <LoadingIcon className="ctw-h-5 ctw-flex-none ctw-fill-caution-icon" />
          <div className="ctw-space-y-2">
            <div className="ctw-text-caution-message">
              In Progress - request received {formatStringISOtoDate(date)}
            </div>
          </div>
        </div>
      );
    case "done":
    case "error":
    default:
      return <div />;
  }
};
