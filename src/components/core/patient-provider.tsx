import { getPatient } from "@/fhir/patient";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { useFhirClientRef } from "@/fhir/utils";
import { PatientModel } from "@/models/patients";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type ThirdPartyID = {
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
};

type PatientProviderProps = {
  children: ReactNode;
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
}: PatientProviderProps) {
  const providerState = useMemo(
    () => ({
      patientID: patientUPID || patientID,
      systemURL: patientUPID ? SYSTEM_ZUS_UNIVERSAL_ID : systemURL,
    }),
    [patientID, patientUPID, systemURL]
  );

  return (
    <CTWPatientContext.Provider value={providerState as ProviderState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export function usePatient(): UseQueryResult<PatientModel, unknown> {
  const fhirClientRef = useFhirClientRef();
  const { patientID, systemURL } = useContext(CTWPatientContext);
  return useQuery(
    ["patient", patientID, systemURL],
    getPatient,
    {
      enabled: !!fhirClientRef,
      meta: { fhirClientRef },
    }
  );
}
