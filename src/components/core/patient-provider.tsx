import React, { useContext } from "react";

import { useCTW } from "./ctw-provider";

import { getUPIDfromPatientID } from "@/fhir/search-helpers";

type ThirdPartyID = { patientID: string; systemURL: string };

type PatientProviderProps = {
  children: React.ReactNode;
} & ThirdPartyID;

export const CTWPatientContext = React.createContext<ThirdPartyID>({
  patientID: "",
  systemURL: "",
});

export function PatientProvider({
  children,
  ...ctwPatientState
}: PatientProviderProps) {
  const providerState = React.useMemo(
    () => ({
      ...ctwPatientState,
    }),
    [ctwPatientState]
  );

  return (
    <CTWPatientContext.Provider value={providerState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(CTWPatientContext);
  const { getCTWFhirClient } = useCTW();

  async function getPatientUPID() {
    const fhirClient = await getCTWFhirClient();
    const patientFilters = {};

    return getUPIDfromPatientID(
      fhirClient,
      context.patientID,
      context.systemURL,
      patientFilters
    );
  }
  return { getPatientUPID };
}
