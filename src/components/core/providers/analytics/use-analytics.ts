import { useContext, useMemo } from "react";
import { AnalyticsContext } from "./context";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useTelemetry } from "@/components/core/providers/telemetry/use-telemetry";

export type TrackedAction = `view_source_document` | "close_drawer" | "close_ccda_modal";

export type TrackedProperties = "srcComponent" | "patientID" | "resourceType" | "target";

export type TrackingMetadata = Partial<Record<TrackedProperties, unknown>>;

export function useAnalytics() {
  const analytics = useContext(AnalyticsContext);
  const telemetry = useTelemetry();
  const patient = usePatient();

  return useMemo(
    () => ({
      // Helper to include patient UPID and optionally also the component name
      // with metadata when tracking interactions
      trackInteraction(action: TrackedAction, metadata: TrackingMetadata = {}) {
        const eventMetadata: Record<string, unknown> = { ...metadata };

        if (analytics.componentName) {
          eventMetadata.componentName = analytics.componentName;
        }
        if (patient.data?.UPID) {
          eventMetadata.upid = patient.data.UPID;
        }
        return telemetry.Telemetry.trackInteraction(action, eventMetadata);
      },
    }),
    [analytics.componentName, patient.data?.UPID, telemetry.Telemetry]
  );
}
