import { FlagProvider, UnleashClient, useUnleashContext } from "@unleash/proxy-client-react";
import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";
import { Env } from "./types";

export const FeatureFlagContext = createContext({
  unleashClientFailed: false,
});

export type FeatureFlagProviderProps = {
  env: Env;
  children: ReactNode;
};

export function FeatureFlagProvider({ env, children }: FeatureFlagProviderProps) {
  const unleashClient = useMemo(
    () =>
      new UnleashClient({
        ...getUnleashProxyForEnv(env),
        refreshInterval: 15, // (in seconds)
        appName: "ctw-component-library",
        context: {},
      }),
    [env]
  );

  return (
    <FlagProvider unleashClient={unleashClient} startClient={false}>
      <FeatureFlagProviderComponent unleashClient={unleashClient}>
        {children}
      </FeatureFlagProviderComponent>
    </FlagProvider>
  );
}

// Map our env to the unleash environment, defaulting to "development".
// NOTE: these keys are hardcoded in https://github.com/zeus-health/aws-base/blame/8eb18e694f5c94b70f15559254ce10027e74f4b4/unleash/scripts/create_secrets.sh#L33-L39
// so they could change without notice. INFRA-729 will create these in AWS secrets for all
// accounts but for now it is safe to store these in GitHub
function getUnleashProxyForEnv(env: Env) {
  switch (env) {
    case "production":
      return {
        url: "https://unleash-proxy-prod.zusapi.com/proxy",
        clientKey: "MDE0NDU5NTQtNEIyNC00RUVGLUI4NDUtRTE3QjYyMUQ3NTAzCg==",
      };
    case "sandbox":
      return {
        url: "https://unleash-proxy.zusapi.com/proxy",
        clientKey: "Q0QwNUIxODgtQkFEMC00MTA2LUIwRDEtRDgwQ0FFRDBBMzBCCg==",
      };
    case "phi-test":
    case "dev":
    default:
      return {
        url: "https://unleash-proxy-dev.zusapi.com/proxy",
        clientKey: "NTk3QkM3RTItMTU4Qi00NDYwLTlFQjQtNjMyQ0ZFMENBNkY1Cg==",
      };
  }
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
