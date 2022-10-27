import { codeableConceptLabel } from "@/fhir/codeable-concept";

export type OperationOutcomeIssueSeverity =
  | "error"
  | "fatal"
  | "warning"
  | "information";

export class OperationOutcomeIssueModel {
  public resource: fhir4.OperationOutcomeIssue;

  constructor(issue: fhir4.OperationOutcomeIssue) {
    this.resource = issue;
  }

  get display(): string {
    return (
      codeableConceptLabel(this.resource.details) ||
      this.resource.diagnostics ||
      `${this.resource.code} error`
    );
  }

  get severity(): OperationOutcomeIssueSeverity {
    return this.resource.severity;
  }
}
