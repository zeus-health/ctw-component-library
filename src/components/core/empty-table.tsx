import { faInbox, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefreshIcon } from "./icons/refresh";
import { Spinner } from "./spinner";
import { RequestRecordsButton } from "../content/patient-history/request-records-button";
import {
  useIsFetchingHistory,
  usePatientHistory,
} from "../content/patient-history/use-patient-history";

export type EmptyTableProps = {
  resourceName: string;
  hasZeroFilteredRecords: boolean;
};

export const EmptyTable = (props: EmptyTableProps) => {
  const patientHistoryQuery = usePatientHistory();
  if (patientHistoryQuery.isLoading) {
    return (
      <div className="ctw-flex ctw-justify-center ctw-space-x-2">
        <span>Loading...</span>
        <Spinner />
      </div>
    );
  }

  const requestMade = patientHistoryQuery.hasJobs;
  if (!requestMade) {
    return (
      <div className="ctw-space-y-3">
        <div className="ctw-space-y-6">
          <div className="ctw-flex ctw-justify-center">
            <RefreshIcon className="ctw-h-16 ctw-text-icon-light" />
          </div>
          <div className="ctw-text-center ctw-text-xl ctw-font-medium">
            Records not requested yet
          </div>
        </div>
        <div className="ctw-flex ctw-justify-center">
          <RequestRecordsButton displayText="Request records now" />
        </div>
      </div>
    );
  }

  if (!patientHistoryQuery.lastRetrievedAt) {
    return <EmptyTableFetchingHistory {...props} />;
  }
  return <EmptyTableNoneFound {...props} />;
};

function EmptyTableNoneFound({ resourceName, hasZeroFilteredRecords }: EmptyTableProps) {
  let icon = faInbox;
  let errorText = `No ${resourceName}`;
  let subText = "We didn't find any records for this patient.";
  if (hasZeroFilteredRecords) {
    icon = faMagnifyingGlass;
    errorText = `No matching ${resourceName} found`;
    subText = "Try changing the filters.";
  }
  return (
    <div className="ctw-space-y-3">
      <div className="ctw-space-y-6">
        <div className="ctw-flex ctw-justify-center">
          <FontAwesomeIcon icon={icon} className="ctw-h-16 ctw-text-icon-light" />
        </div>
        <div className="ctw-text-center ctw-text-xl ctw-font-medium">{errorText}</div>
      </div>
      <div className="ctw-text-center ctw-text-base ctw-font-normal">{subText}</div>
    </div>
  );
}

function EmptyTableFetchingHistory(props: EmptyTableProps) {
  const isLoadingPatientHistory = useIsFetchingHistory();
  if (isLoadingPatientHistory) {
    return (
      <div className="ctw-space-y-3">
        <div className="ctw-space-y-6">
          <div className="ctw-flex ctw-justify-center">
            <Spinner className="ctw-text-icon-light" size={12} />
          </div>
          <div className="ctw-text-center ctw-text-xl ctw-font-medium">Retrieving records now</div>
        </div>
        <div className="ctw-text-center ctw-text-base ctw-font-normal">
          Check back in a few minutes.
        </div>
      </div>
    );
  }
  return <EmptyTableNoneFound {...props} />;
}
