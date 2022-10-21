import { getBuilderFhirPatient } from "@/fhir/patient-helper";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { Tag } from "@/fhir/types";
import { PatientModel } from "@/models/patients";
import { PATIENT_KEY } from "@/utils/query-keys";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./ctw-provider";

// Cache patient for 5 minutes.
const PATIENT_STALE_TIME = 1000 * 60 * 5;

type ThirdPartyID = {
  patientUPID?: never;
  patientID: string;
  systemURL: string;
};

type PatientUPIDSpecified = {
  patientUPID: string;
  patientID?: never;
  systemURL?: never;
};

type ProviderState = {
  patientID: string;
  systemURL: string;
  tags?: Tag[];
};

type PatientProviderProps = {
  children: ReactNode;
  tags?: Tag[];
} & (ThirdPartyID | PatientUPIDSpecified);

export const CTWPatientContext = createContext<ProviderState>({
  patientID: "",
  systemURL: "",
});

export function PatientProvider({
  children,
  patientUPID,
  patientID,
  systemURL,
  tags,
}: PatientProviderProps) {
  const providerState = useMemo(
    () => ({
      patientID: patientUPID || patientID,
      systemURL: patientUPID ? SYSTEM_ZUS_UNIVERSAL_ID : systemURL,
      tags,
    }),
    [patientID, patientUPID, systemURL, tags]
  );

  return (
    <CTWPatientContext.Provider value={providerState as ProviderState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export function usePatient(): UseQueryResult<PatientModel, unknown> {
  const { getRequestContext } = useCTW();
  const { patientID, systemURL, tags } = useContext(CTWPatientContext);
  const patientResponse = useQuery(
    [PATIENT_KEY, patientID, systemURL, tags],
    async () => {
      const requestContext = await getRequestContext();
      return getBuilderFhirPatient(requestContext, patientID, systemURL, {
        _tag: tags?.map((tag) => `${tag.system}|${tag.code}`) ?? [],
      });
    },
    { staleTime: PATIENT_STALE_TIME }
  );
  return patientResponse;
}

export function useQueryWithPatient<T>(
  queryKey: string,
  keys: unknown[],
  query: (
    requestContext: CTWRequestContext,
    patient: PatientModel
  ) => Promise<T>
) {
  const { getRequestContext } = useCTW();
  const patientResponse = usePatient();

  return useQuery(
    [queryKey, patientResponse.data?.UPID, ...keys],
    async () => {
      const requestContext = await getRequestContext();
      // Ignore eslint warning as we should always have a valid
      // patient thanks to the enabled check.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return query(requestContext, patientResponse.data!);
    },
    { enabled: !!patientResponse.data?.UPID }
  );
}
