import { useContext, useMemo } from "react";
import { AnalyticsContext } from "./context";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useTelemetry } from "@/components/core/providers/telemetry/use-telemetry";
import { SortDir } from "@/utils/sort";

// Tracked events indicate the effect the user initiated.
// They don't indicate details like patient, overarching component, or cause, which belong in metadata.
type Action =
  // App-level
  | "logout"
  // Documents
  | "open_source_document"
  | "close_document"
  | "expand_document_section"
  | "collapse_document_section"
  | "download_document"
  // History
  | "expand_history_entry"
  | "collapse_history_entry"
  // Drawers
  | "open_drawer"
  | "close_drawer"
  // Forms
  | "submit_form" // actions include "create_resource", "edit_resource"
  | "cancel_delete_request"
  | "confirm_delete_request"
  // Tables
  | "change_view"
  | "change_filter"
  | "sort"
  // Records
  | "restore_record"
  | "dismiss_record"
  | "mark_record_as_read"
  | "mark_record_as_unread"
  | "open_table_entry";

// Properties to include in metadata if applicable,
// beyond the default of component and patient.
export type TrackingMetadata = {
  resourceType?: string;
  target?: string; // For identical events, indicates which UI triggered it.
  value?: string; // Value of selector
  action?: string; // Further differentiates actions
  dir?: SortDir;
  datadogMetricName?: string;
};

export function useAnalytics() {
  const analytics = useContext(AnalyticsContext);
  const telemetry = useTelemetry();
  const patient = usePatient();

  return useMemo(
    () => ({
      // Helper to include patient UPID and optionally also the component name
      // with metadata when tracking interactions
      trackInteraction(action: Action, metadata: TrackingMetadata = {}) {
        const eventMetadata: Record<string, unknown> = { ...metadata };

        if (analytics.componentName) {
          eventMetadata.componentName = analytics.componentName;
        }
        if (patient.data?.UPID) {
          eventMetadata.upid = patient.data.UPID;
        }
        return telemetry.Telemetry.trackInteraction(action, eventMetadata);
      },

      analyticsEvent(action: string, eventMetadata = {}) {
        return telemetry.Telemetry.analyticsEvent(action, eventMetadata);
      },
    }),
    [analytics.componentName, patient.data?.UPID, telemetry.Telemetry]
  );
}
