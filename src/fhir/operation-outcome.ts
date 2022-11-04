export function isOperationOutcome(
  response: unknown
): response is fhir4.OperationOutcome {
  if (typeof response === "object" && response !== null) {
    return "issue" in response;
  }
  return false;
}
