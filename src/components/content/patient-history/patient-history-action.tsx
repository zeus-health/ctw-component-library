import { PatientHistoryLastRetrieved } from "./patient-history-last-retrieved";
import { RequestRecordsButton } from "./request-records-button";
import { useFeatureToggle } from "@/hooks/use-feature-toggle";

export type PatientHistoryActionProps = {
  hideRequestRecords?: boolean;
  includePatientDemographicsForm?: boolean;
};

export const PatientHistoryLastRetrievedWithAction = ({
  hideRequestRecords = false,
  includePatientDemographicsForm = false,
}: PatientHistoryActionProps) => {
  const hideRequestRecordsFormToggle = !useFeatureToggle("ctw-patient-history-form").enabled;

  return (
    <>
      <div>
        <PatientHistoryLastRetrieved />
      </div>
      <div>
        {!(hideRequestRecords || hideRequestRecordsFormToggle) && (
          <RequestRecordsButton includePatientDemographicsForm={includePatientDemographicsForm} />
        )}
      </div>
    </>
  );
};
