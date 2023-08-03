import { useContext } from "react";
import { CTWStateContext } from "../ctw-context";

export function useTelemetry() {
  const context = useContext(CTWStateContext);

  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  return {
    ehr: context.ehr,
    enableTelemetry: context.enableTelemetry,
  };
}
