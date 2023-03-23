import cx from "classnames";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { useTimelineEvents } from "@/fhir/timeline-event";
import { useState } from "react";
import { CollapsibleDataListEntry } from "@/components/core/collapsible-data-list";
import { usePatientEncounterDetailsDrawer } from "../timeline/patient-timeline";
import { EncounterModel } from "@/fhir/models/encounter";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { DiagnosticReportModel } from "@/fhir/models";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimelineV2({ className }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents();
  const { featureFlags } = useCTW();
  const openEncounterDetails = usePatientEncounterDetailsDrawer();
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();

  return (
    <div
      className={cx(
        className,
        "ctw-scrollable-pass-through-height ctw-overflow-hidden"
      )}
    >
      <Table
        isLoading={timelineEventsQuery.isLoading}
        records={timelineEventsQuery.data}
        columns={patientTimelineColumns(true)}
        handleRowClick={(record) => {
          if (record.model.constructor === EncounterModel) {
            openEncounterDetails(record.model);
          } else if (record.model.constructor === DiagnosticReportModel) {
            openDiagnosticReportDetails(record.model);
          }
        }}
      />
    </div>
  );
}
