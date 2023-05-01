import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";

export type PatientHistoryActionProps = {
  hideRequestRecords: boolean;
};

export const PatientHistoryAction = ({ hideRequestRecords = false }: PatientHistoryActionProps) => (
  <div className="ctw-flex ctw-space-x-1">
    <PatientHistoryLastRetrieved />
    {!hideRequestRecords && <RequestRecordsButton />}
  </div>
);
