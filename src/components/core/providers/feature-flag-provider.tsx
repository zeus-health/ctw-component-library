import { FlagProvider, UnleashClient, useUnleashContext } from "@unleash/proxy-client-react";
import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";

export const FeatureFlagContext = createContext({
  unleashClientFailed: false,
});

export type FeatureFlagProviderProps = {
  children: ReactNode;
};

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const unleashClient = useMemo(
    () =>
      new UnleashClient({
        url: "https://unleash-proxy-prod.zusapi.com/proxy",
        clientKey: "MDE0NDU5NTQtNEIyNC00RUVGLUI4NDUtRTE3QjYyMUQ3NTAzCg==",
        refreshInterval: 15, // (in seconds)
        appName: "ctw-component-library",
        context: {},
      }),
    []
  );

  return (
    <FlagProvider unleashClient={unleashClient} startClient={false}>
      <FeatureFlagProviderComponent unleashClient={unleashClient}>
        {children}
      </FeatureFlagProviderComponent>
    </FlagProvider>
  );
}

type FeatureFlagProviderComponentProps = {
  children: ReactNode;
  unleashClient: UnleashClient;
};

// Component responsible for fetching the auth token and updating the Unleash context once the auth token has been fetched.
// This needs to be a child of `FlagProvider` in order to have access to the Unleash context.
const FeatureFlagProviderComponent = ({
  unleashClient,
  children,
}: FeatureFlagProviderComponentProps) => {
  const updateContext = useUnleashContext();
  const authTokenPromise = useGetAuthToken();
  const [authToken, setAuthToken] = useState<string>();
  const [unleashClientStarted, setUnleashClientStarted] = useState<boolean>();
  const [unleashClientFailed, setUnleashClientFailed] = useState<boolean>();

  // fetch the auth token
  useEffect(() => {
    void (async function fetchData() {
      setAuthToken(await authTokenPromise());
    })();
  }, [authTokenPromise]);

  // configure the unleash client
  useEffect(() => {
    if (authToken && !unleashClientStarted) {
      void (async function run() {
        unleashClient.on("error", () => {
          setUnleashClientFailed(true);
        });
        await updateContext(getUnleashContext(authToken));
        await unleashClient.start();
        setUnleashClientStarted(true);
      })();
    }
  }, [authToken, unleashClient, unleashClientStarted, updateContext]);

  const context = useMemo(
    () => ({
      unleashClientFailed: !!unleashClientFailed,
    }),
    [unleashClientFailed]
  );

  return <FeatureFlagContext.Provider value={context}>{children}</FeatureFlagContext.Provider>;
};

function getUnleashContext(authToken: string) {
  const decoded = jwtDecode(authToken) as { [key: string]: string };
  // For some reason unleash proxy does not like localhost appearing
  // in the query params and will return 403's.
  // As a work around, we replace localhost with local.
  const hostname = window.location.hostname.replace("localhost", "local");

  return {
    userId: decoded["https://zusapi.com/user_id"],
    properties: {
      builderId: decoded["https://zusapi.com/builder_id"],
      builderName: decoded["https://zusapi.com/builder_name"],
      userType: decoded["https://zusapi.com/user_type"],
      email: decoded["https://zusapi.com/email"],
      hostname,
    },
  };
}
