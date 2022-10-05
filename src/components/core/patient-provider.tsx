import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
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
  // Case to catch if user doesnt provide either of the
  if (!patientID && !systemURL) {
    if (!patientUPID) {
      throw Error(
        "Need to provide either patientID and systemURL, or patientUPID"
      );
    }
  }

  const providerState = useMemo(
    () => ({
      patientID: patientUPID || patientID,
      systemURL: patientUPID ? SYSTEM_ZUS_UNIVERSAL_ID : systemURL,
    }),
    [patientID, patientUPID, systemURL]
  );

  return (
    <CTWPatientContext.Provider value={providerState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export function usePatient() {
  return useContext(CTWPatientContext);
}
