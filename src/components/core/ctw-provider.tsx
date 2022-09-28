import { getFhirClient } from "@/fhir/client";
import { DefaultTheme, mapToCSSVar, Theme } from "@/styles/tailwind.theme";
import { queryClient } from "@/utils/request";
import { QueryClientProvider } from "@tanstack/react-query";
import { merge } from "lodash";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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
  children: ReactNode;
  env: Env;
  theme?: Theme;
  headers?: HeadersInit;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

const CTWStateContext = createContext<CTWState | undefined>(undefined);

function CTWProvider({ theme, children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = useState<CTWToken>();

  const handleAuth = useCallback(async () => {
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

  const providerState = useMemo(
    () => ({
      ...ctwState,
      // Set our context theme to our default theme merged
      // with any of the provided theme overwrites.
      // This way consumers of useCTW can get access to
      // the full true theme being applied.
      theme: merge({}, DefaultTheme, theme),
      token,
      actions: {
        handleAuth,
      },
    }),
    [ctwState, theme, handleAuth, token]
  );

  return (
    <div style={mapToCSSVar(theme?.colors || {})}>
      <QueryClientProvider client={queryClient}>
        <CTWStateContext.Provider value={providerState}>
          {children}
        </CTWStateContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

function useCTW() {
  const context = useContext(CTWStateContext);
  if (context === undefined || context.theme === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getCTWFhirClient = useCallback(async () => {
    const authToken = await context.actions.handleAuth();
    return getFhirClient(context.env, authToken);
  }, [context]);
  return { getCTWFhirClient, theme: context.theme as Required<Theme> };
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
