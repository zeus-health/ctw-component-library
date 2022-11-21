export type PatientHistoryMessageProps = {
  message?: string;
};

export const PatientHistoryMessage = ({
  message,
}: PatientHistoryMessageProps) => (
  <div className="ctw-flex ctw-justify-center ctw-space-x-2 ctw-border ctw-border-solid ctw-border-divider-light ctw-p-5">
    <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
      {message}
    </div>
    <button type="button" className="ctw-btn-clear ctw-link">
      Request Records
    </button>
  </div>
);
