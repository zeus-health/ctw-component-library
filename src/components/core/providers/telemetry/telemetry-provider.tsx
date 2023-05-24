import { PropsWithChildren, useEffect } from "react";
import { useGetAuthToken } from "../authentication/use-get-auth-token";
import { Env } from "../types";
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

  useEffect(() => {
    Telemetry.init(env, ehr, enableTelemetry);
    Telemetry.setBuilder(builderId);
    getAuthToken()
      .then((accessToken) => Telemetry.setUser(accessToken))
      .catch(() => Telemetry.clearUser());
  }, [builderId, env, ehr, enableTelemetry, getAuthToken]);

  return <>{children}</>;
}
