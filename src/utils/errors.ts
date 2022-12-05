import { cloneDeep } from "lodash";
import { OperationOutcomeModel } from "..";
import { ActionReturn } from "@/components/content/forms/types";
import { FhirError, fhirErrorResponse, isFhirError } from "@/fhir/errors";
import { isOperationOutcome } from "@/fhir/operation-outcome";

export function isError(error: unknown): error is Error {
  if (typeof error === "object" && error !== null) {
    return "message" in error;
  }
  return false;
}

export function errorMessage(error: unknown): string {
  return isError(error)
    ? error.message.split(":")[0]
    : "An unknown error occurred";
}

export const errorResponse = (
  title: string,
  e?: FhirError | Error | unknown
) => {
  if (isFhirError(e)) {
    throw fhirErrorResponse(title, e);
  }

  if (isError(e)) {
    return { ...{ title }, ...{ statusText: e.message } };
  }

  return { title };
};

export const getFormResponseErrors = (response: unknown) => {
  let requestErrors: string[] = [];
  let responseIsSuccess = true;

  if (isFhirError(response) && isOperationOutcome(response.response.data)) {
    requestErrors = new OperationOutcomeModel(response.response.data).issues
      .filter((issue) => issue.severity !== "warning")
      .map((issue) => issue.display);
    responseIsSuccess = false;
  } else if (response instanceof Error) {
    requestErrors = [response.message];
    responseIsSuccess = false;
  }
  return { requestErrors, responseIsSuccess };
};
