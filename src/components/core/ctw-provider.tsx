import { getFhirClient } from "@/fhir/client";
import * as React from "react";

export type Env = "dev" | "sandbox" | "production";

type CTWState = { env: Env; authToken: string; theme: any };

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

  const fhirClient = getFhirClient(context.env, context.authToken);
  return { fhirClient, theme: context.theme };
}

export { CTWProvider, useCTW };
