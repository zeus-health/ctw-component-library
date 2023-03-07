import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { version } from "../../../../package.json";
import {
  CTWRequestContext,
  CTWState,
  CTWStateContext,
  CTWToken,
  FeatureFlags,
} from "./ctw-context";
import { getFhirClient } from "@/fhir/client";
import {
  DefaultTheme,
  EmptyTailwindCSSVars,
  mapToCSSVar,
  Theme,
} from "@/styles/tailwind.theme";
import { claimsBuilderId, claimsExp } from "@/utils/auth";
import { merge } from "@/utils/nodash";
import { QUERY_KEY_AUTH_TOKEN } from "@/utils/query-keys";
import { ctwFetch, queryClient } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";
import "../main.scss";

export type Env = "dev" | "sandbox" | "production";

// We use an expiry padding to provide a buffer to prevent race conditions.
// A race condition could happen in that we check if the token is expired,
// it isn't, but by time we do our request(s) it has expired.
const EXPIRY_PADDING_MS = 60000;

type AuthTokenSpecified = { authToken: string; authTokenURL?: never };

// authTokenURL should return a valid Zus accessToken.
// E.g. {access_token: ZUS_ACCESS_TOKEN}
type AuthTokenURLSpecified = { authToken?: never; authTokenURL: string };

type CTWProviderProps = {
  builderId?: string;
  children: ReactNode;
  enableTelemetry?: boolean;
  env: Env;
  headers?: Record<string, string>;
  featureFlags?: FeatureFlags;
  theme?: Theme;
} & (AuthTokenSpecified | AuthTokenURLSpecified);

declare global {
  interface Window {
    CTWComponentLibrary: {
      version: string;
    };
  }
}

/**
 * CTWProvider is required for Zus components to operate and at least one
 * should exist in the app as an ancestor to any ctw-component-library React
 * component (we recommend CTWProvider be at the root of your project). In
 * addition to providing a client request context, the CTWProvider also allows
 * for theme configuration and opting into telemetry collection if desired.
 */
function CTWProvider({
  children,
  enableTelemetry = false,
  featureFlags,
  theme,
  ...ctwState
}: CTWProviderProps) {
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

  useEffect(() => {
    Telemetry.init(ctwState.env, enableTelemetry);
    Telemetry.setBuilder(ctwState.builderId);
    handleAuth()
      .then((accessToken) => Telemetry.setUser(accessToken))
      .catch(() => Telemetry.clearUser());
  }, [ctwState.builderId, ctwState.env, enableTelemetry, handleAuth, token]);

  const providerState = useMemo(
    () => ({
      ...ctwState,
      featureFlags,
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
    [ctwState, theme, handleAuth, token, ctwProviderRef, featureFlags]
  );

  return (
    <div ref={ctwProviderRef} className="ctw-provider">
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
      contextBuilderId: context.builderId,
      fhirClient: getFhirClient(context.env, authToken, context.builderId),
    };
    return requestContext;
  }, [context]);

  return {
    getRequestContext,
    theme: context.theme as Required<Theme>,
    ctwProviderRef: context.ctwProviderRef,
    featureFlags: context.featureFlags,
  };
}

export function useQueryWithCTW<T, T2>(
  queryKey: string,
  keys: T2[],
  query: (requestContext: CTWRequestContext, keys?: T2[]) => Promise<T>,
  enabled = true
) {
  const { getRequestContext } = useCTW();

  return useQuery(
    [queryKey, ...keys],
    async () => {
      const requestContext = await getRequestContext();
      return query(requestContext, keys);
    },
    { enabled }
  );
}

async function checkOrRefreshAuth(
  token: CTWToken | undefined,
  url: CTWState["authTokenURL"],
  headers?: Record<string, string>
): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    const response = await queryClient.fetchQuery(
      [QUERY_KEY_AUTH_TOKEN, url],
      async () => ctwFetch(url as string, { headers })
    );
    const newToken = await response.json();
    return {
      accessToken: newToken.access_token,
      expiresAt: claimsExp(newToken.access_token) * 1000,
    };
  }
  return token;
}

export { CTWProvider, useCTW };
