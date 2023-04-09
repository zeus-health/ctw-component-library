import { ErrorIcon } from "@/components/core/error-icon";
import { ProgressIcon } from "@/components/core/progress-icon";
import { formatISODateStringToDate } from "@/fhir/formatters";
import {
  PatientHistoryServiceMessage,
  PatientRefreshHistoryMessageStatus,
} from "@/services/patient-history/patient-history-types";

export type PatientHistoryStatusProps = {
  status?: PatientRefreshHistoryMessageStatus;
  date?: string;
  messages: PatientHistoryServiceMessage[] | undefined;
};

export const PatientHistoryStatus = ({
  status,
  date,
  messages,
}: PatientHistoryStatusProps) => {
  const servicesStatus = messages?.every(
    (message) => message.status === "done"
  );

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
    case "error":
      return <ErrorState />;
    case "done_with_errors":
      return <ErrorState />;
    case "done":
      return servicesStatus ? null : <ErrorState />;

    default:
      return null;
  }
};

const ErrorState = () => (
  <div className="ctw-alert-bg ctw-rounded-md ctw-bg-error-bg">
    <ErrorIcon className="ctw-h-5 ctw-flex-none ctw-fill-error-main" />
    <div className="ctw-font-medium ctw-text-error-text">
      There was an error fetching some or all records for this patient.
      <div className="ctw-font-normal ctw-text-error-text">
        Contact your organization’s technical support if this issue persists for
        more than 24 hours.
      </div>
    </div>
  </div>
);
