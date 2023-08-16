import { PropsWithChildren, useEffect, useMemo } from "react";
import { useGetAuthToken } from "../authentication/use-get-auth-token";
import { Env } from "../types";
import { TelemetryContext } from "@/components/core/providers/telemetry/context";
import { Telemetry } from "@/utils/telemetry";

type TelemetryProviderProps = {
  env: Env;
  builderId?: string;
  enableTelemetry?: boolean;
  ehr?: string;
};

export function TelemetryProvider({
  children,
  env,
  builderId,
  enableTelemetry = false,
  ehr,
}: PropsWithChildren<TelemetryProviderProps>) {
  const getAuthToken = useGetAuthToken();
  const contextValue = useMemo(
    () => ({
      builderId,
      ehr,
      enableTelemetry,
    }),
    [builderId, ehr, enableTelemetry]
  );

  useEffect(() => {
    Telemetry.init(env, ehr, enableTelemetry);
    Telemetry.setBuilder(builderId);
    getAuthToken()
      .then((accessToken) => Telemetry.setUser(accessToken))
      .catch(() => Telemetry.clearUser());
  }, [builderId, env, ehr, enableTelemetry, getAuthToken]);

  return <TelemetryContext.Provider value={contextValue}>{children}</TelemetryContext.Provider>;
}
