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
    <div className="ctw-space-y-3">
      <div className="ctw-title-container"></div>
      <div className="ctw-title">{message}</div>
      <div>{children}</div>
    </div>
  </div>
);
