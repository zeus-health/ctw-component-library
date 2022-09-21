import { FhirError, fhirErrorResponse, isFhirError } from "@/fhir/errors";

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
