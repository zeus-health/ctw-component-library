import { getFhirClient } from "@/fhir/client";
import * as React from "react";

type CTWState = { url: string; authToken: string };

type CTWProviderProps = { children: React.ReactNode } & CTWState;

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ children, ...ctwState }: CTWProviderProps) {
  return (
    <CTWStateContext.Provider value={ctwState}>
      {children}
    </CTWStateContext.Provider>
  );
}

function useCTW() {
  const context = React.useContext(CTWStateContext);
  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const fhirClient = getFhirClient(context.url, context.authToken);
  return { fhirClient };
}

export { CTWProvider, useCTW };
