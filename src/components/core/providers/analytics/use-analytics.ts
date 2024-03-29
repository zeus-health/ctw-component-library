import { useContext, useMemo } from "react";
import { AnalyticsContext } from "./context";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useTelemetry } from "@/components/core/providers/telemetry/use-telemetry";
import { SortDir } from "@/utils/sort";

// Tracked events indicate the effect the user initiated.
// They don't indicate details like patient, overarching component, or cause, which belong in metadata.
export type Action =
  // App-level
  | "logout"
  | "toggle_ai_search"
  | "search"
  | "clear_search"
  // Documents
  | "open_source_document"
  | "close_document"
  | "toggle_document_section"
  | "download_document"
  | "add_to_record"
  // History
  | "toggle_history_entry"
  // Notes
  | "toggle_note"
  // Drawers
  | "open_drawer"
  | "close_drawer"
  // Forms
  | "submit_form" // actions include "create_resource", "edit_resource"
  | "cancel_delete_request"
  | "confirm_delete_request"
  | "request_records"
  | "open_diagnostic_report"
  // Trends
  | "toggle_trend"
  // Tables
  | "change_view"
  | "change_filter"
  | "sort"
  | "open_tab"
  | "empty_table"
  // Records
  | "toggle_record_archive"
  | "toggle_record_read"
  | "click_row"
  | "change_page"
  // ADT-table
  | "view_adt_details";

// Properties to include in metadata if applicable,
// beyond the default of component and patient.
export type TrackingMetadata = {
  resourceType?: string;
  target?: string; // For identical events, indicates which UI triggered it.
  value?: string; // Value of selector
  action?: string; // Further differentiates actions
  dir?: SortDir;
  datadogMetricName?: string;
  page?: number; // Which page number the action triggered or triggured on
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
