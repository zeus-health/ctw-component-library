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
  authTokenURL?: string;
  theme?: any;
  token?: CTWToken;
  actions: {
    handleAuth: (t: CTWToken) => Promise<null | undefined>;
  }
}

type AuthTokenSpecified = { authToken: string; authTokenURL?: never };
type AuthTokenURLSpecified = { authToken?: never; authTokenURL: string; };

type CTWProviderProps = { 
  children: React.ReactNode,
  env: Env;
  theme?: any;
  token?: CTWToken;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = React.useState(ctwState.token);

  const handleAuth = React.useCallback(async (t: CTWToken) => {
    if (ctwState.authToken) return null;
    try {
      const newToken = await checkOrRefreshAuth(t, ctwState.authTokenURL);
      if (t.accessToken === newToken.accessToken) return null;
      setToken(newToken);
    } catch (err) {
      console.error(err); // Catch thrown error from `checkOrRefreshAuth`.
    }
  }, []);

  const providerState = React.useMemo(() => ({
    ...ctwState,
    token,
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
    try {
      if (context.authToken) return getFhirClient(context.env, context.authToken);
      if (context.token) {
        await context.actions.handleAuth(context.token);
        return getFhirClient(context.env, context.token.accessToken);
      }

      if (!context.token) {
        const ctwToken = await checkOrRefreshAuth(undefined, context.authTokenURL);
        await context.actions.handleAuth(ctwToken);
        return getFhirClient(context.env, ctwToken.accessToken)
      }
    } catch (err) {
      throw err; // Throw error to useCTW() consumer.
    }
  }
  return { getCTWFhirClient, theme: context.theme };
}

async function checkOrRefreshAuth(token: CTWToken | undefined, url: CTWState["authTokenURL"]): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    try {
      const response = await fetch(url as string);
      const newToken = await response.json();
      return ({
        accessToken: newToken.access_token,
        issuedTokenType: newToken.issued_token_type,
        tokenType: newToken.token_type,
        expiresAt: Date.now() + newToken.expires_in * 1000,
      });
    } catch (err) {
      throw(err); // TODO: Better error handling.
    }
  }
  return token;
}

export { CTWProvider, useCTW };
