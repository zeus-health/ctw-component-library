import * as React from "react";

import { getFhirClient } from "@/fhir/client";
import { Style } from "@/styles/style";

export type Env = "dev" | "sandbox" | "production";

const EXPIRY_PADDING_MS = 60000;

type CTWToken = {
  accessToken: string;
  issuedTokenType: string;
  tokenType: string;
  expiresAt: number;
};

type CTWState = {
  env: Env;
  authToken?: string;
  authTokenURL?: string;
  theme?: any;
  token?: CTWToken;
  actions: {
    handleAuth: () => Promise<CTWToken | null>;
  };
};

type AuthTokenSpecified = { authToken: string; authTokenURL?: never };
type AuthTokenURLSpecified = { authToken?: never; authTokenURL: string };

type CTWProviderProps = {
  children: React.ReactNode;
  env: Env;
  style?: Style;
  theme?: any;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ style, children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = React.useState<CTWToken>();

  const handleAuth = React.useCallback(async () => {
    if (ctwState.authToken) return null;
    try {
      const newToken = await checkOrRefreshAuth(token, ctwState.authTokenURL);
      if (token?.accessToken === newToken.accessToken) return token;
      setToken(newToken);
      return newToken;
    } catch (err) {
      throw err; // Throw error from `checkOrRefreshAuth`.
    }
  }, []);

  const providerState = React.useMemo(
    () => ({
      ...ctwState,
      token,
      actions: {
        handleAuth,
      },
    }),
    [ctwState, handleAuth]
  );

  // Casts Style as CSSProperties so that it can be passed as a style.
  return (
    <div style={style as React.CSSProperties}>
      <CTWStateContext.Provider value={providerState}>
        {children}
      </CTWStateContext.Provider>
    </div>
  );
}

function useCTW() {
  const context = React.useContext(CTWStateContext);
  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getCTWFhirClient = async () => {
    const token = await context.actions.handleAuth();
    const tokenString = context.authToken ?? (token?.accessToken as string);
    return getFhirClient(context.env, tokenString);
  };
  return { getCTWFhirClient, theme: context.theme };
}

async function checkOrRefreshAuth(
  token: CTWToken | undefined,
  url: CTWState["authTokenURL"]
): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    try {
      const response = await fetch(url as string);
      const newToken = await response.json();
      return {
        accessToken: newToken.access_token,
        issuedTokenType: newToken.issued_token_type,
        tokenType: newToken.token_type,
        expiresAt: Date.now() + newToken.expires_in * 1000,
      };
    } catch (err) {
      throw err; // TODO: Better error handling.
    }
  }
  return token;
}

export { CTWProvider, useCTW };
