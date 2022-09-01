import React, { useContext } from "react";

type CTWID = {
  patientID: string;
  systemURL: string;
};

type ThirdPartyID = { patientID: string; systemURL: string };

type PatientProviderProps = {
  children: React.ReactNode;
} & ThirdPartyID;

export const CTWPatientContext = React.createContext<CTWID>({
  patientID: "",
  systemURL: "",
});

export function patientProvider({
  children,
  ...ctwState
}: PatientProviderProps) {
  const providerState = React.useMemo(
    () => ({
      ...ctwState,
    }),
    [ctwState]
  );

  return (
    <CTWPatientContext.Provider value={providerState}>
      {children}
    </CTWPatientContext.Provider>
  );
}

export const usePatientContext = () => useContext(CTWPatientContext);
