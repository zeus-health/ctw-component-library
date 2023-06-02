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

// Takes a fhir resource and returns a new one that has numerous fixes
// to help get saves working with ODS.
// 1. Remoes all empty arrays.
//    This fixes an issue where ODS will complain with:
//    "Array cannot be empty - the property should not be present if it has no values"
// 2. Removes all null and undefined values.
// 3. Removes "resource" from references which are added by FQS.
export const fixupFHIR = <T>(value: T): T =>
  // Cast because the function that finds and omits arrays produces an unknown.
  fixupFHIRHelper(value) as T;

const fixupFHIRHelper = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined;
    }
    return value.map(fixupFHIR);
  }

  if (value !== null && typeof value === "object") {
    const newValue = value as { [key: string]: unknown };
    Object.entries(newValue).forEach(([key, v]) => {
      if (v === undefined || v === null) {
        delete newValue[key];
      } else {
        newValue[key] = fixupFHIR(v);
      }
      // FQS allows fetching nested "resource" objects from references.
      // We cannot pass these back when saving to ODS,
      // so we delete them from the object here.
      // Our simple test is if the current object has a "reference"
      // and a "resource" object.
      if (newValue.reference && typeof newValue.resource === "object") {
        delete newValue.resource;
      }
    });
    return newValue;
  }

  return value;
};
