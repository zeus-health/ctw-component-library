import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { TimelineEventModel } from "@/fhir/models/timeline-event";
import { m } from "msw/lib/SetupApi-75fbec12";

export const patientTimelineColumns = (includeViewFhirResource = false) => {
  const timellineColumns: TableColumn<TimelineEventModel>[] = [
    {
      title: "WHEN",
      widthPercent: 10,
      minWidth: 120,
      render: (timelineEvent) => (
        <div className="group-hover:ctw-underline">{timelineEvent.date}</div>
      ),
    },
    {
      title: "WHAT",
      widthPercent: 20,
      minWidth: 150,
      render: (timelineEvent) => (
        <div>
          <div>{timelineEvent.type}</div>
          <div>{timelineEvent.subtype}</div>
        </div>
      ),
    },
    {
      title: "WHO",
      widthPercent: 20,
      minWidth: 150,
      render: (timelineEvent) => (
        <div>
          {timelineEvent.actor.map((row) => (
            <div>{row}</div>
          ))}
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
