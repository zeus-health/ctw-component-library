import { usePatientHistory } from "./use-patient-history";

export const RequestRecordsButton = () => {
  const { openHistoryRequestDrawer } = usePatientHistory();

  return (
    <button
      type="button"
      className="ctw-btn-clear ctw-link"
      onClick={openHistoryRequestDrawer}
      data-zus-telemetry-click="Request records"
    >
      Request Records
    </button>
  );
};
