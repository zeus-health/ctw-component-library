export type PatientHistoryMessageProps = {
  message?: string;
};

export const PatientHistoryMessage = ({
  message,
}: PatientHistoryMessageProps) => (
  <div className="ctw-body-container">
    <div className="ctw-flex ctw-justify-center ctw-space-y-3 ctw-space-x-2">
      <div className="ctw-title-container" />
      <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
        {message}
      </div>
      <div>
        <button type="button" className="ctw-btn-clear ctw-link">
          Request Records
        </button>
      </div>
    </div>
  </div>
);
