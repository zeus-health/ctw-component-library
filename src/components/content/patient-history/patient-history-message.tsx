export type PatientHistoryProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PatientHistoryMessage = ({ onClick }: PatientHistoryProps) => (
  <div className="ctw-flex ctw-justify-center ctw-space-x-2 ctw-border ctw-border-solid ctw-border-divider-light ctw-p-5">
    <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
      Retrieve patient clinical history.
    </div>
    <button type="button" className="ctw-btn-clear ctw-link" onClick={onClick}>
      Request Records
    </button>
  </div>
);
