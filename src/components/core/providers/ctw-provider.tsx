import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useMemo } from "react";
import {
  AuthenticationProvider,
  AuthenticationProviderProps,
} from "./authentication/authentication-provider";
import { CTWStateContext, FeatureFlags } from "./ctw-context";
import { TelemetryProvider } from "./telemetry/telemetry-provider";
import { ThemeProvider, ThemeProviderProps } from "./theme/theme-provider";
import { Env } from "./types";
import { version } from "../../../../package.json";
import { queryClient } from "@/utils/request";

type CTWProviderProps = {
  env: Env;
  builderId?: string;
  enableTelemetry?: boolean;
  ehr?: string;
  featureFlags?: FeatureFlags;
} & ThemeProviderProps &
  AuthenticationProviderProps;

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
export function CTWProvider({
  children,
  env,
  builderId,
  enableTelemetry = false,
  ehr,
  featureFlags,
  locals,
  theme,
  headers,
  authToken,
  authTokenURL,
}: PropsWithChildren<CTWProviderProps>) {
  useEffect(() => {
    window.CTWComponentLibrary = {
      version,
    };
  }, []);

  const providerState = useMemo(
    () => ({
      env,
      builderId,
      featureFlags,
    }),
    [env, builderId, featureFlags]
  );

  return (
    <ThemeProvider theme={theme} locals={locals}>
      <AuthenticationProvider headers={headers} authToken={authToken} authTokenURL={authTokenURL}>
        <TelemetryProvider
          env={env}
          builderId={builderId}
          ehr={ehr}
          enableTelemetry={enableTelemetry}
        >
          <CTWStateContext.Provider value={providerState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </CTWStateContext.Provider>
        </TelemetryProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}
