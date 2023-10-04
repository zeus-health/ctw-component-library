import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";

export type PatientHistoryActionProps = {
  hideRequestRecords?: boolean;
  includePatientDemographicsForm?: boolean;
};

export const PatientHistoryLastRetrievedWithAction = ({
  hideRequestRecords = false,
  includePatientDemographicsForm = false,
}: PatientHistoryActionProps) => (
  <>
    <div>
      <PatientHistoryLastRetrieved />
    </div>
    <div>
      {!hideRequestRecords && (
        <RequestRecordsButton includePatientDemographicsForm={includePatientDemographicsForm} />
      )}
    </div>
  </>
);
