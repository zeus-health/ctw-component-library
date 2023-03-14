import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";
import { useShowPatientHistoryRequestButton } from "./use-patient-history";

export type PatientHistoryActionProps = {
  hideRequestRecords: boolean;
};

export const PatientHistoryAction = ({
  hideRequestRecords = false,
}: PatientHistoryActionProps) => {
  const showRequestRecordsRequestButton = useShowPatientHistoryRequestButton();

  return (
    <div className="ctw-flex ctw-space-x-1">
      <PatientHistoryLastRetrieved />
      {!hideRequestRecords && !showRequestRecordsRequestButton && (
        <RequestRecordsButton />
      )}
    </div>
  );
};
