import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCTW } from "./ctw-provider";

import { getUPIDfromPatientID } from "@/fhir/search-helpers";

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
  patientUPIDPromise: Promise<string>;
};

type PatientProviderProps = {
  children: ReactNode;
} & (ThirdPartyID | PatientUPIDSpecified);

const unresolvedPromise = new Promise<string>((resolve, reject) => {});

export const CTWPatientContext = createContext<ProviderState>({
  patientUPIDPromise: unresolvedPromise,
});

export function PatientProvider({
  children,
  patientUPID,
  patientID,
  systemURL,
}: PatientProviderProps) {
  const [patientUPIDPromise, setPatientUPIDPromise] =
    useState(unresolvedPromise);
  const { getCTWFhirClient } = useCTW();

  useEffect(() => {
    async function getPatientUPID() {
      if (patientUPID) {
        return patientUPID;
      }
      if (patientID && systemURL) {
        const fhirClient = await getCTWFhirClient();
        return getUPIDfromPatientID(fhirClient, patientID, systemURL);
      }
      // This should not actually be possible.
      throw new Error("Patient UPID or patient id/system url was not defined.");
    }
    setPatientUPIDPromise(getPatientUPID());
  }, [patientID, systemURL, patientUPID, getCTWFhirClient]);

  const providerState = useMemo(
    () => ({ patientUPIDPromise }),
    [patientUPIDPromise]
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
