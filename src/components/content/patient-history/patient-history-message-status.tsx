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
    case "error":
      return (
        <div className="ctw-alert-bg ctw-rounded-md ctw-bg-caution-bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="ctw-h-5 ctw-flex-none ctw-fill-caution-icon"
          >
            <path
              d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 
            416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48
             21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7
              18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 
              75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
            />
          </svg>
          <div className="ctw-space-y-2">
            <div className="ctw-text-caution-message">
              In Progress - request received {formatStringISOtoDate(date)}
            </div>
          </div>
        </div>
      );
    case "done":
    case "in_progress":
    default:
      return <div />;
  }
};
