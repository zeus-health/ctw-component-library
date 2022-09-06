import { getFhirClient } from "@/fhir/client";
import * as React from "react";
import { TailwindTheme } from "tailwind.theme";

export type Theme = Partial<
  Record<keyof typeof TailwindTheme["colors"], string>
>;

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
    handleAuth: () => Promise<CTWToken | null>;
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
  console.log("we got some theme", theme);

  const handleAuth = React.useCallback(async () => {
    if (ctwState.authToken) return null;
    try {
      const newToken = await checkOrRefreshAuth(
        token,
        ctwState.authTokenURL,
        ctwState.headers
      );
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
    [ctwState, handleAuth, token]
  );

  // Casts Style as CSSProperties so that it can be passed as a style.
  return (
    // TODO convert theme to CSS vars for "styles".
    <div>
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
  url: CTWState["authTokenURL"],
  headers?: HeadersInit
): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    try {
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
    } catch (err) {
      throw err;
    }
  }
  return token;
}

export { CTWProvider, useCTW };
