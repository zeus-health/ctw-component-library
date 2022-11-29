import { ReactNode } from "react";

export type PatientHistoryProps = {
  children: ReactNode;
};

export const PatientHistoryMessage = ({ children }: PatientHistoryProps) => (
  <div className="ctw-flex ctw-justify-center ctw-space-x-2 ctw-border ctw-border-solid ctw-border-divider-light ctw-p-5">
    <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
      Retrieve patient clinical history.
    </div>
    <div>{children}</div>
  </div>
);
