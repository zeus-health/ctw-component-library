import { useContext } from "react";
import { TelemetryContext } from "./context";

export function useTelemetry() {
  return useContext(TelemetryContext);
}
