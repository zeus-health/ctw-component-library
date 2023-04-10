import cx from "classnames";
import { usePatientHistory } from "./use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";

type RequestRecordsButtonProps = {
  className?: cx.Argument;
  includePatientDemographicsForm?: boolean;
};

export const RequestRecordsButton = withErrorBoundary(
  ({
    className,
    includePatientDemographicsForm,
  }: RequestRecordsButtonProps) => {
    const { openHistoryRequestDrawer } = usePatientHistory(
      includePatientDemographicsForm
    );

    return (
      <button
        type="button"
        className={cx("ctw-btn-clear ctw-link", className)}
        onClick={openHistoryRequestDrawer}
        data-zus-telemetry-click="Request records"
      >
        Request Records
      </button>
    );
  },
  "RequestRecordsButton"
);
