import Client from "fhir-kit-client";
import { getZusFhirBaseUrl, getZusFhirWriteBackBaseUrl } from "@/api/urls";
import { Env } from "@/components/core/providers/types";
import { CTW_REQUEST_HEADER } from "@/utils/request";

export function getFhirClients(env: Env, accessToken: string, builderId?: string) {
  const customHeaders: HeadersInit = CTW_REQUEST_HEADER;
  if (builderId) {
    customHeaders["Zus-Account"] = builderId;
  }
  // fhirClient reads/writes directly to and from ODS
  const fhirClient = new Client({
    baseUrl: getZusFhirBaseUrl(env),
    bearerToken: accessToken,
    customHeaders,
  });
  // fhirWriteBackClient uses write-back proxy to create new FHIR resources which could also have
  // configurations in ehr-data-integration service to additionally write out to an external source
  const fhirWriteBackClient = new Client({
    baseUrl: getZusFhirWriteBackBaseUrl(env),
    bearerToken: accessToken,
    customHeaders,
  });

  return {
    fhirClient,
    fhirWriteBackClient,
  };
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
