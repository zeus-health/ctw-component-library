import { OperationOutcomeIssueModel } from "@/models/operation-outcome-issue";
import { AlertProps, ErrorAlert } from "../core/alert";

export type OperationErrorsAlertProps = {
  issues: OperationOutcomeIssueModel[];
} & Omit<AlertProps, "children">;

export function OperationErrorsAlert({
  header,
  className,
  issues,
}: OperationErrorsAlertProps) {
  const errorIssues = issues.filter((issue) => issue.severity !== "warning");
  return (
    <ErrorAlert header={header} className={className}>
      {errorIssues.length === 1 ? (
        issues[0].display
      ) : (
        <ul className="ctw-m-0 ctw-list-disc ctw-px-4">
          {errorIssues.map((issue) => (
            <li>{issue.display}</li>
          ))}
        </ul>
      )}
    </ErrorAlert>
  );
}
