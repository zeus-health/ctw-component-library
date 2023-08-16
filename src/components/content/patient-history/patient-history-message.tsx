import { withErrorBoundary } from "@/components/core/error-boundary";

export type PatientHistoryProps = {
  readOnly: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PatientHistoryMessage = withErrorBoundary(
  ({ readOnly, onClick }: PatientHistoryProps) => (
    <div className="ctw-flex ctw-justify-center ctw-space-x-2 ctw-border ctw-border-solid ctw-border-divider-light ctw-p-5">
      {readOnly ? (
        <span>There are no condition records available.</span>
      ) : (
        <>
          <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
            Retrieve patient clinical history.
          </div>
          <button
            type="button"
            className="ctw-btn-clear ctw-link"
            onClick={onClick}
            data-zus-telemetry-click="Request records"
          >
            Request Records
          </button>
        </>
      )}
    </div>
  ),
  "PatientHistoryMessage"
);
