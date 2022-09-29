import Client from "fhir-kit-client";
import jwt_decode from "jwt-decode";

import { Env } from "@/components/core/ctw-provider";

export function getFhirClient(env: Env, accessToken: string) {
  const url =
    env === "production"
      ? `https://api.zusapi.com/fhir`
      : `https://api.${env}.zusapi.com/fhir`;

  const client = new Client({
    baseUrl: url,
    bearerToken: accessToken,
    customHeaders: {
      "User-Agent": "zus_ctw_component_library fhirclient",
    },
  });

  return client;
}

export type ZusJWT = {
  SYSTEM_ZUS_BUILDER_ID: string;
  // We only use the above properties. Others can be any key with any type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export function getJWT(fhirClient: Client): ZusJWT {
  // To access an unexposed property, cast as any.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authHeader = (fhirClient as any).httpClient.authHeader
    .authorization as string;
  const bearerToken = authHeader.substring(7);
  // Cast because a decoded JWT is an unknown.
  const jwt = jwt_decode(bearerToken) as ZusJWT;
  return jwt;
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
