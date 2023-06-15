import {
  FlagProvider,
  UnleashClient,
  useUnleashClient,
  useUnleashContext,
} from "@unleash/proxy-client-react";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";

export type FeatureFlagProviderProps = { children: ReactNode };

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
      <FeatureFlagProviderComponent>{children}</FeatureFlagProviderComponent>
    </FlagProvider>
  );
}

// Component responsible for fetching the auth token and updating the Unleash context once the auth token has been fetched.
// This needs to be a child of `FlagProvider` in order to have access to the Unleash context.
const FeatureFlagProviderComponent = ({ children }: FeatureFlagProviderProps) => {
  const client = useUnleashClient();
  const updateContext = useUnleashContext();
  const authTokenPromise = useGetAuthToken();
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    void (async function fetchData() {
      setAuthToken(await authTokenPromise());
    })();
  }, [authTokenPromise]);

  useEffect(() => {
    if (authToken) {
      void (async function run() {
        // Explicitly stop/start the Unleash client when updating the context to avoid a race condition
        // where existing "in flight" requests to the Unleash server (with incorrect context info) are returned
        // just as the new (correct) Unleash context is set.
        client.stop();
        await updateContext(getUnleashContext(authToken));
        await client.start();
      })();
    }
  }, [authToken, client, updateContext]);

  return <>{children}</>;
};

function getUnleashContext(authToken: string) {
  const decoded = jwtDecode(authToken) as { [key: string]: string };
  return {
    userId: decoded["https://zusapi.com/user_id"],
    properties: {
      builderId: decoded["https://zusapi.com/builder_id"],
      builderName: decoded["https://zusapi.com/builder_name"],
      userType: decoded["https://zusapi.com/user_type"],
      email: decoded["https://zusapi.com/email"],
    },
  };
}
