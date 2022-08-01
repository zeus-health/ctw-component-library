import { Env } from "@/components/core/ctw-provider";
import Client from "fhir-kit-client";

export function getFhirClient(env: Env, accessToken: string) {
  const url =
    env === "production"
      ? `https://api.zusapi.com/fhir`
      : `https://api.${env}.zusapi.com/fhir`;

  console.log(url);

  return new Client({
    baseUrl: url,
    bearerToken: accessToken,
    customHeaders: {
      "User-Agent": "zus_ctw_component_library fhirclient",
    },
  });
}

// Returns a new value with all empty arrays replaced with "undefined".
// This fixes an issue where ODS will complain with:
// "Array cannot be empty - the property should not be present if it has no values"
export const omitEmptyArrays = (value: unknown): unknown => {
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
