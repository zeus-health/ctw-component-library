import * as React from "react";

type CTWState = { url: string; bearerToken: string };

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
  return context;
}

export { CTWProvider, useCTW };
