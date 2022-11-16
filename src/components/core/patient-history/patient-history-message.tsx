import { ReactNode } from "react";

export type RetrievePatientHistoryProps = {
  message?: string;
  children?: ReactNode;
};

export const RetrievePatientHistory = ({
  message,
  children,
}: RetrievePatientHistoryProps) => (
  <div className="ctw-body-container">
    <div className="ctw-flex ctw-justify-center ctw-space-y-3 ctw-space-x-2">
      <div className="ctw-title-container" />
      <div className="ctw-flex ctw-justify-center ctw-text-icon-default">
        {message}
      </div>
      <div>{children}</div>
    </div>
  </div>
);
