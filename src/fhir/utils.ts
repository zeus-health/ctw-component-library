import { QueryMeta } from "@tanstack/react-query";
import Client from "fhir-kit-client";
import { useRef } from "react";
import { useCTW } from "../components/core/ctw-provider";

// We use a ref here because if we pass FHIR Client to meta normally it will use whatever
// you passed as meta when the query was created which means it can be come stale
export function useFhirClientRef() {
  const fhirClientRef = useRef<Client>();
  const { getCTWFhirClient } = useCTW();

  getCTWFhirClient()
    .then((value) => {
      fhirClientRef.current = value;
    })
    .catch((error) => {
      throw Error("Failed to get the FHIR Client");
    });

  return fhirClientRef;
}

export const getFhirClientFromQuery = (meta: QueryMeta | undefined) => {
  let fhirClient;
  if (meta?.fhirClientRef) {
    const ref = meta.fhirClientRef as React.MutableRefObject<Client>;
    fhirClient = ref.current;
  }
  if (!fhirClient) {
    throw Error("FhirClient must be provided");
  }
  return fhirClient;
};
