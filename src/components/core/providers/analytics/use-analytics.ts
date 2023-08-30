import { useContext, useMemo } from "react";
import { AnalyticsContext } from "./context";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useTelemetry } from "@/components/core/providers/telemetry/use-telemetry";

export type TrackedEvent =
  | "view_source_document"
  | "close_drawer"
  | "close_ccda_modal" // todo: add srcComponent
  | "open_ccda_modal"
  | "change_view" // todo: add metadata for view-button.tsx
  | "expand_item"
  | "collapse_item";

export type TrackedComponent = "resource-details-drawer" | "modal-ccda" | "history-entry";

export type TrackableProperty = {
  componentHierarchy: TrackedComponent[];
  patientID: string;
  resourceType: string;
  target: unknown;
  value: unknown;
};

export type TrackingMetadata = Partial<TrackableProperty>;

// Helper to produce a copy of the given metadata or create a new one, with the given component added to the hierarchy.
export function newTrackingDataForComponent(
  componentName: TrackedComponent,
  prevMetadata: TrackingMetadata = {}
): TrackingMetadata {
  const srcComponents = prevMetadata.componentHierarchy || [];
  return {
    ...prevMetadata,
    componentHierarchy: [...srcComponents, componentName],
  };
}

export function useAnalytics() {
  const analytics = useContext(AnalyticsContext);
  const telemetry = useTelemetry();
  const patient = usePatient();

  return useMemo(
    () => ({
      // Helper to include patient UPID and optionally also the component name
      // with metadata when tracking interactions
      trackInteraction(action: TrackedEvent, metadata: TrackingMetadata = {}) {
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
