import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { TimelineEventModel } from "@/fhir/models/timeline-event";

export const patientTimelineColumns = (includeViewFhirResource = false) => {
  const timellineColumns: TableColumn<TimelineEventModel>[] = [
    {
      title: "Date",
      widthPercent: 10,
      minWidth: 120,
      render: (timelineEvent) => (
        <div className="group-hover:ctw-underline">
          {timelineEvent.eventDate}
        </div>
      ),
    },
    {
      title: "Type",
      widthPercent: 20,
      minWidth: 150,
      render: (timelineEvent) => (
        <div>
          <div>{timelineEvent.display}</div>
          <div>{timelineEvent.eventSubtype}</div>
        </div>
      ),
    },
  ];

  if (includeViewFhirResource) {
    timellineColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (encounter) => (
        <ViewFHIR name="Encounter Resource" resource={encounter.resource} />
      ),
    });
  }

  return timellineColumns;
};
