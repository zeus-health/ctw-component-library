import { createContext } from "react";

type TelemetryContextValue = {
  builderId?: string;
  enableTelemetry?: boolean;
  ehr?: string;
};

export const TelemetryContext = createContext<TelemetryContextValue>({});
