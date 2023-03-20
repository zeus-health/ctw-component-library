import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";
import { useHasOtherRecordData } from "./use-patient-history";

export type PatientHistoryActionProps = {
  hideRequestRecords: boolean;
};

export const PatientHistoryAction = ({
  hideRequestRecords = false,
}: PatientHistoryActionProps) => {
  const showRequestRecordsRequestButtonQuery = useHasOtherRecordData();

  return (
    <div className="ctw-flex ctw-space-x-1">
      <PatientHistoryLastRetrieved />
      {!hideRequestRecords &&
        !showRequestRecordsRequestButtonQuery.hasNoOutsideData && (
          <RequestRecordsButton />
        )}
    </div>
  );
};
