import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";

export type PatientHistoryActionProps = {
  hideRequestRecords?: boolean;
};

export const PatientHistoryLastRetrievedWithAction = ({
  hideRequestRecords = false,
}: PatientHistoryActionProps) => (
  <>
    <div>
      <PatientHistoryLastRetrieved />
    </div>
    <div>{!hideRequestRecords && <RequestRecordsButton />}</div>
  </>
);
