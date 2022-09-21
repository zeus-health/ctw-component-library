import { usePatient } from "@/components/core/patient-provider";
import useSWR from "swr";
import { useCTW } from "..";

function useSWRFetch({ endpoint, options = null, condition = true, fetcher }) {
  const { getCTWFhirClient } = useCTW();
  const { patientPromise } = usePatient();
  const { data, error, mutate } = useSWR(
    condition ? [endpoint] : null,
    fetcher,
    options
  );

  return {
    mutate,
    data,
    isLoading: !error && !data,
    error,
  };
}
