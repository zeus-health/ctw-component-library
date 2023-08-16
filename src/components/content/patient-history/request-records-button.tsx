import cx from "classnames";
import { usePatientHistory } from "./use-patient-history";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";

type RequestRecordsButtonProps = {
  className?: cx.Argument;
  includePatientDemographicsForm?: boolean;
  displayText?: string;
};

export const RequestRecordsButton = withErrorBoundary(
  ({
    className,
    includePatientDemographicsForm,
    displayText = "Request Records",
  }: RequestRecordsButtonProps) => {
    const { openHistoryRequestDrawer } = usePatientHistory(includePatientDemographicsForm);
    const { trackInteraction } = useAnalytics();

    return (
      <button
        type="button"
        className={cx("ctw-btn-clear ctw-link", className)}
        onClick={() => {
          void openHistoryRequestDrawer();
          trackInteraction("btn_request_records");
        }}
      >
        {displayText}
      </button>
    );
  },
  "RequestRecordsButton",
  false
);
