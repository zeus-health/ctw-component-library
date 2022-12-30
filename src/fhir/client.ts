import Client from "fhir-kit-client";
import { Env } from "@/components/core/providers/ctw-provider";
import { CTW_REQUEST_HEADER } from "@/utils/request";

export function getFhirClient(
  env: Env,
  accessToken: string,
  builderId?: string
) {
  const url =
    env === "production"
      ? `https://api.zusapi.com/fhir`
      : `https://api.${env}.zusapi.com/fhir`;

  const customHeaders: HeadersInit = CTW_REQUEST_HEADER;
  if (builderId) {
    customHeaders["Zus-Account"] = builderId;
  }

  return new Client({
    baseUrl: url,
    bearerToken: accessToken,
    customHeaders,
  });
}

// Returns a new value with all empty arrays replaced with "undefined".
// This fixes an issue where ODS will complain with:
// "Array cannot be empty - the property should not be present if it has no values"
export const omitEmptyArrays = <T>(value: T): T =>
  // Cast because the function that finds and omits arrays produces an unknown.
  omitEmptyArraysHelper(value) as T;

const omitEmptyArraysHelper = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined;
    }
    return value.map(omitEmptyArrays);
  }

  if (value !== null && typeof value === "object") {
    const newValue = value as { [key: string]: unknown };
    Object.entries(newValue).forEach(([key, v]) => {
      newValue[key] = omitEmptyArrays(v);
    });
    return newValue;
  }

  return value;
};
