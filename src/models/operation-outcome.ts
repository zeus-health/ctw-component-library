import { OperationOutcomeIssueModel } from "./operation-outcome-issue";

export class OperationOutcomeModel {
  public resource: fhir4.OperationOutcome;

  constructor(outcome: fhir4.OperationOutcome) {
    this.resource = outcome;
  }

  // Condense the errors into one string.
  get display(): string {
    const issues = this.resource.issue
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => {
        let locationError = "";
        if (issue.location && issue.location.length > 0) {
          const location = issue.location[0];
          locationError += `${location} -- `;
        }
        return `${locationError}${issue.diagnostics}`;
      });

    return issues.join("; ");
  }

  // Get the models of each issue in this outcome.
  get issues(): OperationOutcomeIssueModel[] {
    return this.resource.issue.map(
      (issue) => new OperationOutcomeIssueModel(issue)
    );
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }
}
