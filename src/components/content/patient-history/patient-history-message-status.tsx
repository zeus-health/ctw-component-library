import { ErrorIcon } from "@/components/core/error-icon";
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
      return (
        <div className="ctw-alert-bg ctw-rounded-md ctw-bg-error-bg">
          <ErrorIcon className="ctw-h-5 ctw-flex-none ctw-fill-error-main" />
          <div className="ctw-font-medium ctw-text-error-text">
            There was an error fetching some or all records for this patient.
            <div className="ctw-font-normal ctw-text-error-text">
              Contact your organization’s technical support if this issue
              persists for more than 24 hours.
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};
