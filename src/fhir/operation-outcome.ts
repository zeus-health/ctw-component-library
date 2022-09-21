export function isOperationOutcome(
  response: unknown
): response is fhir4.OperationOutcome {
  if (typeof response === "object" && response !== null) {
    return "issue" in response;
  }
  return false;
}

export function listErrorIssues(outcome: fhir4.OperationOutcome): string {
  const issues = outcome.issue
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
