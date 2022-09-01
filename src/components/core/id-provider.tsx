import React from "react";

type CTWID = {
  patientID: string;
  systemURL: string;
};

type ThirdPartyID = { patientID: string; systemURL: string };

type IDProviderProps = {
  children: React.ReactNode;
} & ThirdPartyID;

export const CTWIDContext = React.createContext<CTWID>({
  patientID: "",
  systemURL: "",
});

export function IDProvider({ children, ...ctwState }: IDProviderProps) {
  const providerState = React.useMemo(
    () => ({
      ...ctwState,
    }),
    [ctwState]
  );

  return (
    <CTWIDContext.Provider value={providerState}>
      {children}
    </CTWIDContext.Provider>
  );
}
