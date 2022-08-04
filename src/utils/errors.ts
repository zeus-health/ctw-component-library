export function isError(error: unknown): error is Error {
  if (typeof error === "object" && error !== null) {
    return "message" in error;
  }
  return false;
}

export function errorMessage(error: unknown): string {
  return isError(error) ? error.message.split(":")[0] : "No records found";
}
