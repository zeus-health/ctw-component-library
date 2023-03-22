import cx from "classnames";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientTimelineColumns } from "./patient-timeline-columns";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { useTimelineEvents } from "@/fhir/timeline-event";

export type PatientTimelineProps = {
  className?: cx.Argument;
};

export function PatientTimelineV2({ className }: PatientTimelineProps) {
  const timelineEventsQuery = useTimelineEvents();
  const { featureFlags } = useCTW();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.eventDate}`,

    getSourceDocument: true,
    details: timelineEventData,
  });

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
        handleRowClick={openDetails}
      />
    </div>
  );
}

const timelineEventData = (encounter: TimelineEventModel) => [
  { label: "Event Date", value: encounter.eventDate },
];
