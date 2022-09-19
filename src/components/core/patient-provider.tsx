import { getBuilderFhirPatient } from "@/fhir/patient-helper";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";
import { PatientModel } from "@/models/patients";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCTW } from "./ctw-provider";

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
  patientPromise: Promise<PatientModel>;
};

type PatientProviderProps = {
  children: ReactNode;
} & (ThirdPartyID | PatientUPIDSpecified);

const unresolvedPromise = new Promise<PatientModel>((resolve, reject) => {});

export const CTWPatientContext = createContext<ProviderState>({
  patientPromise: unresolvedPromise,
});

export function PatientProvider({
  children,
  patientUPID,
  patientID,
  systemURL,
}: PatientProviderProps) {
  const [patientPromise, setPatientPromise] =
    useState<Promise<PatientModel>>(unresolvedPromise);
  const { getCTWFhirClient } = useCTW();

  useEffect(() => {
    async function getPatient() {
      if ((patientID && systemURL) || patientUPID) {
        const fhirClient = await getCTWFhirClient();
        return getBuilderFhirPatient(
          fhirClient,
          patientID ?? patientUPID,
          systemURL ?? SYSTEM_ZUS_UNIVERSAL_ID
        );
      }
      // This should not actually be possible.
      throw new Error("Patient UPID or patient id/system url was not defined.");
    }
    setPatientPromise(getPatient());
  }, [patientID, systemURL, patientUPID, getCTWFhirClient]);

  const providerState = useMemo(() => ({ patientPromise }), [patientPromise]);
  return (
    <CTWPatientContext.Provider value={providerState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export function usePatient() {
  return useContext(CTWPatientContext);
}
