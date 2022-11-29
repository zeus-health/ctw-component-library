import { QueryClientProvider } from "@tanstack/react-query";
import { merge } from "lodash";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { version } from "../../../package.json";
import {
  CTWRequestContext,
  CTWState,
  CTWStateContext,
  CTWToken,
} from "./ctw-context";
import { queryClient } from "@/utils/request";
import { claimsBuilderId } from "@/utils/auth";
import {
  DefaultTheme,
  EmptyTailwindCSSVars,
  mapToCSSVar,
  Theme,
} from "@/styles/tailwind.theme";
import { getFhirClient } from "@/fhir/client";
import "./main.scss";

export type Env = "dev" | "sandbox" | "production";

const EXPIRY_PADDING_MS = 60000;

type AuthTokenSpecified = { authToken: string; authTokenURL?: never };
type AuthTokenURLSpecified = { authToken?: never; authTokenURL: string };

type CTWProviderProps = {
  children: ReactNode;
  env: Env;
  builderId?: string;
  theme?: Theme;
  headers?: HeadersInit;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

declare global {
  interface Window {
    CTWComponentLibrary: {
      version: string;
    };
  }
}

function CTWProvider({ theme, children, ...ctwState }: CTWProviderProps) {
  const [token, setToken] = useState<CTWToken>();
  const ctwProviderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.CTWComponentLibrary = {
      version,
    };
  }, []);

  // Manually apply our CSS theme string AND the
  // fix for empty tailwind CSS vars.
  // We have to apply this manually instead of `style={style}`
  // as we want to use a string instead of an object where react would
  // drop the empty variables!
  useEffect(() => {
    const styles = {
      ...mapToCSSVar(theme?.colors || {}),
      ...EmptyTailwindCSSVars,
    };

    // Convert our styles into a style string.
    const style = Object.entries(styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(";");

    ctwProviderRef.current?.setAttribute("style", style);
  }, [ctwProviderRef, theme]);

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
      ctwProviderRef,
      actions: {
        handleAuth,
      },
    }),
    [ctwState, theme, handleAuth, token, ctwProviderRef]
  );

  return (
    <div ref={ctwProviderRef}>
      <CTWStateContext.Provider value={providerState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CTWStateContext.Provider>

      {/* Workaround for https://github.com/tailwindlabs/headlessui/discussions/666 */}
      <div id="headlessui-portal-root">
        {/* It needs at least one child, so that HeadlessUI doesn't remove this portal root workaround
        ( https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-react/src/components/portal/portal.tsx#L84 ) */}
        <div />
      </div>
    </div>
  );
}

function useCTW() {
  const context = useContext(CTWStateContext);
  if (context === undefined || context.theme === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getRequestContext = useCallback(async () => {
    const authToken = await context.actions.handleAuth();
    const requestContext: CTWRequestContext = {
      env: context.env,
      authToken,
      builderId: context.builderId ?? claimsBuilderId(authToken) ?? "",
      fhirClient: getFhirClient(context.env, authToken, context.builderId),
    };
    return requestContext;
  }, [context]);

  return {
    getRequestContext,
    theme: context.theme as Required<Theme>,
    ctwProviderRef: context.ctwProviderRef,
  };
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
