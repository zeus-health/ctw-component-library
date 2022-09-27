import { QueryMeta } from "@tanstack/react-query";
import Client from "fhir-kit-client";
import { useRef } from "react";
import { useCTW } from "../components/core/ctw-provider";

// A reference to fhirClient is useful for things like useQuery where we pass it in as part of the meta data.
// This allows useQuery to always use a fresh copy of fhirClient (whatever the reference points to).
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
