import { PropsWithChildren, useEffect } from "react";
import { useAuthentication } from "../authentication/use-authentication";
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
  const { getAuthToken } = useAuthentication();

  useEffect(() => {
    Telemetry.init(env, ehr, enableTelemetry);
    Telemetry.setBuilder(builderId);
    getAuthToken()
      .then((accessToken) => Telemetry.setUser(accessToken))
      .catch(() => Telemetry.clearUser());
  }, [builderId, env, ehr, enableTelemetry, getAuthToken]);

  return <>{children}</>;
}
