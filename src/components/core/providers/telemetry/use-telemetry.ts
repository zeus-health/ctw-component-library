import { useContext } from "react";
import { TelemetryContext } from "./context";
import { Telemetry } from "@/utils/telemetry";

export function useTelemetry() {
  return {
    Telemetry,
    context: useContext(TelemetryContext),
  };
}
