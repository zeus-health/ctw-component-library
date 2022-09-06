import React, { useContext, useEffect, useState } from "react";

import { useCTW } from "./ctw-provider";

import { getUPIDfromPatientID } from "@/fhir/search-helpers";

type ThirdPartyID = { patientID: string; systemURL: string };

type PatientProviderProps = {
  children: React.ReactNode;
} & ThirdPartyID;

export const CTWPatientContext = React.createContext<string>("");

export function PatientProvider({
  children,
  ...ctwState
}: PatientProviderProps) {
  const [providerState, setProviderState] = useState("");
  const { getCTWFhirClient } = useCTW();

  useEffect(() => {
    async function getUPID() {
      const fhirClient = await getCTWFhirClient();
      const patientFilters = {};

      const { patientUPID } = await getUPIDfromPatientID(
        fhirClient,
        ctwState.patientID,
        ctwState.systemURL,
        patientFilters
      );
      setProviderState(patientUPID);
    }
    getUPID();
  }, [ctwState.patientID, ctwState.systemURL]);

  return (
    <CTWPatientContext.Provider value={providerState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export const usePatientContext = () => useContext(CTWPatientContext);
