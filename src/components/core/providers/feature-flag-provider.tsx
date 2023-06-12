import FlagProvider from "@unleash/proxy-client-react";
import jwtDecode from "jwt-decode";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";

export type FeatureFlagProviderProps = { children: ReactNode };

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const authTokenPromise = useGetAuthToken();
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    void (async function fetchData() {
      setAuthToken(await authTokenPromise());
    })();
  }, [authTokenPromise]);

  const unleashConfig = useMemo(
    () => ({
      url: "https://unleash-proxy-prod.zusapi.com/proxy",
      clientKey: "MDE0NDU5NTQtNEIyNC00RUVGLUI4NDUtRTE3QjYyMUQ3NTAzCg==",
      refreshInterval: 15, // (in seconds)
      appName: "ctw-component-library",
      context: authToken ? getUnleashContext(authToken) : {},
    }),
    [authToken]
  );

  if (!authToken) {
    return <>{children}</>;
  }
  return <FlagProvider config={unleashConfig}>{children}</FlagProvider>;
}

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
