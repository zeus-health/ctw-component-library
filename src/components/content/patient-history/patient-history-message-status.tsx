import { ExclamationIcon } from "@heroicons/react/outline";

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
    case "error":
      return (
        <div className="ctw-alert-bg ctw-rounded-md ctw-bg-caution-bg">
          <ExclamationIcon className="ctw-h-5 ctw-flex-none ctw-text-caution-icon" />
          <div className="ctw-space-y-2">
            <div className="ctw-text-caution-message">
              In Progress - request received {date}
            </div>
          </div>
        </div>
      );
    case "done":
    case "in_progress":
    default:
      return <div>Hi</div>;
  }
};
