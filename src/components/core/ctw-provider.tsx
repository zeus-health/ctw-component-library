import { getFhirClient } from "@/fhir/client";
import { mapToCSSVar, Theme } from "@/styles/tailwind.theme";
import * as React from "react";
import "./main.scss";

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
  headers?: HeadersInit;
  authTokenURL?: string;
  theme?: Theme;
  token?: CTWToken;
  actions: {
    handleAuth: () => Promise<string>;
  };
};

type AuthTokenSpecified = { authToken: string; authTokenURL?: never };
type AuthTokenURLSpecified = { authToken?: never; authTokenURL: string };

type CTWProviderProps = {
  children: React.ReactNode;
  env: Env;
  theme?: Theme;
  headers?: HeadersInit;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

const CTWStateContext = React.createContext<CTWState | undefined>(undefined);

function CTWProvider({ theme, children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = React.useState<CTWToken>();

  const handleAuth = React.useCallback(async () => {
    if (ctwState.authToken) {
      return ctwState.authToken;
    }

    const newToken = await checkOrRefreshAuth(
      token,
      ctwState.authTokenURL,
      ctwState.headers
    );
    if (token?.accessToken !== newToken.accessToken) {
      setToken(newToken);
    }
    return newToken.accessToken;
  }, [token, ctwState]);

  const providerState = React.useMemo(
    () => ({
      ...ctwState,
      token,
      actions: {
        handleAuth,
      },
    }),
    [ctwState, handleAuth, token]
  );

  return (
    <div style={mapToCSSVar(theme || {})}>
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

  const getCTWFhirClient = React.useCallback(async () => {
    const authToken = await context.actions.handleAuth();
    return getFhirClient(context.env, authToken);
  }, [context]);
  return { getCTWFhirClient, theme: context.theme };
}

async function checkOrRefreshAuth(
  token: CTWToken | undefined,
  url: CTWState["authTokenURL"],
  headers?: HeadersInit
): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    const response = await fetch(url as string, {
      headers,
    });
    const newToken = await response.json();
    return {
      accessToken: newToken.access_token,
      issuedTokenType: newToken.issued_token_type,
      tokenType: newToken.token_type,
      expiresAt: Date.now() + newToken.expires_in * 1000,
    };
  }
  return token;
}

export { CTWProvider, useCTW };
