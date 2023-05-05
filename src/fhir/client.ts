import Client from "fhir-kit-client";
import { getZusFhirBaseUrl, getZusProxyFhirBaseUrl } from "@/api/urls";
import { Env } from "@/components/core/providers/ctw-provider";
import { CTW_REQUEST_HEADER } from "@/utils/request";

export function getFhirClient(env: Env, accessToken: string, builderId?: string) {
  const fhirBaseUrl = getZusFhirBaseUrl(env);
  const fhirProxyBaseUrl = getZusProxyFhirBaseUrl(env);

  const customHeaders: HeadersInit = CTW_REQUEST_HEADER;
  if (builderId) {
    customHeaders["Zus-Account"] = builderId;
  }
  // FHIR Client to ODS
  const fhirClient = new Client({
    baseUrl: fhirBaseUrl,
    bearerToken: accessToken,
    customHeaders,
  });
  // FHIR Client to proxy
  const fhirWriteClient = new Client({
    baseUrl: fhirProxyBaseUrl,
    bearerToken: accessToken,
    customHeaders,
  });

  // Use Proxy to trap fhirClient writes that would create new resources.
  // Learn more about proxies here: https://javascript.info/proxy
  return new Proxy(fhirClient, {
    get(target, prop) {
      if (prop in target) {
        const targetValue = target[prop as keyof typeof target];
        if (prop === "request") {
          // Return a function that wraps Client.request and determines the
          // correct client to use based on the request method. The reason
          // we have to implement the wrapper here is because we don't know
          // if we should call the proxy url until we see the request method.
          type UrlPathParam = Parameters<typeof Client.prototype.request>[0];
          type RequestParam = Parameters<typeof Client.prototype.request>[1];
          type RequestRV = ReturnType<Client["request"]>;
          return (url: UrlPathParam, requestOptions: RequestParam): RequestRV => {
            const method = requestOptions?.method?.toUpperCase() ?? "";
            if (method === "POST") {
              return fhirWriteClient.request(url, requestOptions);
            }
            return fhirClient.request(url, requestOptions);
          };
        }

        if (typeof targetValue === "function") {
          // If the target is a function, we will bind it to the correct client.
          // The "save" method is the only method we care to proxy atm.
          return targetValue.bind(prop === "save" ? fhirWriteClient : target);
        }
        return targetValue;
      }

      return undefined; // prop doesn't exist on fhir client
    },
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
