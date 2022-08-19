import { getFhirClient } from "@/fhir/client";
import * as React from "react";

export type Env = "dev" | "sandbox" | "production";

const EXPIRY_PADDING_MS = 60000;

type CTWToken = {
  accessToken: string;
  issuedTokenType: string;
  tokenType: string;
  expiresAt: number;
}

type CTWState = { 
  env: Env;
  authToken?: string;
  authTokenURL: string;
  theme: any;
  token: CTWToken
  actions: {
    handleAuth: () => Promise<null | undefined>;
  }
}

type CTWProviderProps = { children: React.ReactNode } & CTWState;

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = React.useState(ctwState.token);
  const handleAuth = React.useCallback(async () => {
    if (ctwState.authToken) return null;
    const newToken = await checkOrRefreshAuth(token, ctwState.authTokenURL);
    if (token.accessToken === newToken.accessToken) return null;
    setToken(newToken);
  }, [])
  const providerState = React.useMemo(() => ({
    ...ctwState,
    actions: {
      handleAuth,
    },
  }), [ctwState, handleAuth])
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
    const tokenString = context.authToken ?? context.token.accessToken;
    return getFhirClient(context.env, tokenString);
  }
  return { getCTWFhirClient, theme: context.theme };
}

async function checkOrRefreshAuth(token: CTWToken, url: CTWState["authTokenURL"]): Promise<CTWToken> {
  if (Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    try {
      const headers = {
        authorization: `${token.tokenType} ${token.accessToken}`,
        contentType: "application/json",
      }
      const body = { duration: 3600 } // From Healthie integration document spec.
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      })
      const newToken = await response.json();
      return {
        accessToken: newToken.access_token,
        issuedTokenType: newToken.issued_token_type,
        tokenType: newToken.token_type,
        expiresAt: Date.now() + newToken.expires_in * 1000,
      };
    } catch (err) {
      console.error(err); // TODO: Better error handling.
    }
  }
  return token;
}

export { CTWProvider, useCTW };
