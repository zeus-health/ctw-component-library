import { isOperationOutcome, listErrorIssues } from "./operation-outcome";

export type FhirError = {
  response: {
    status: number;
    data: unknown;
  };
  config: {
    method: string;
    url: string;
    headers: Record<string, string>;
  };
};

export function isFhirError(error: unknown): error is FhirError {
  if (typeof error === "object" && error !== null) {
    return "response" in error && "config" in error;
  }
  return false;
}

export const fhirErrorResponse = (title: string, e: FhirError) => {
  const { data, status } = e.response;
  let errorStr = "";
  if (isOperationOutcome(data)) {
    errorStr = listErrorIssues(data);
  }

  return { title, status, statusText: errorStr };
};
