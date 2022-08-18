import { getFhirClient } from "@/fhir/client";
import * as React from "react";

export type Env = "dev" | "sandbox" | "production";

const EXPIRY_PADDING_MS = 60000;

type CTWToken = {
  accessToken: string;
  issuedTokenType: string;
  tokenType: string;
  expiresInSeconds: number;
}

type CTWState = { 
  env: Env;
  authToken?: string;
  authTokenURL: string;
  theme: any;
} & { 
  token: CTWToken,
  actions: {
    handleAuth: () => Promise<null | undefined>;
  }
};

type CTWProviderProps = { children: React.ReactNode } & CTWState;

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = React.useState(ctwState.token);
  const handleAuth = async () => {
    if (ctwState.authToken) return null;
    const newToken = await checkOrRefreshAuth(token, ctwState.authTokenURL);
    if (token.accessToken === newToken.accessToken) return null;
    setToken(newToken);
  }
  const providerState = {
    ...ctwState,
    actions: {
      handleAuth,
    },
  }
  return (
    <CTWStateContext.Provider value={providerState}>
      {children}
    </CTWStateContext.Provider>
  );
}

function useCTW() {
  const context = React.useContext(CTWStateContext);
  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }
  const getCTWFhirClient = async () => {
    await context.actions.handleAuth();
    const tokenString = context.authToken ?? `${context.token.tokenType} ${context.token.accessToken}`;
    return getFhirClient(context.env, tokenString);
  }
  return { getCTWFhirClient, theme: context.theme };
}

async function checkOrRefreshAuth(token: CTWToken, url: CTWState["authTokenURL"]): CTWToken {
  if (Date.now() >= token.expiresInSeconds * 1000 + EXPIRY_PADDING_MS) {
    try {
      const data = {
        duration: 3600, // From Healthie spec.
      }
      const response = await fetch(url, {
        method: "POST",
        body: data,
      })
      const result = await response.json();
      return result.token;
    } catch (err) {
      console.error(err); // TODO: Better error handling.
    }
  }
  return token;
}

export { CTWProvider, useCTW };
