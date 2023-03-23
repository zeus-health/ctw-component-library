import { SimpleMoreList } from "@/components/core/simple-more-list";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { TimelineEventModel } from "@/fhir/models/timeline-event";

export const patientTimelineColumns = (includeViewFhirResource = false) => {
  const timellineColumns: TableColumn<TimelineEventModel>[] = [
    {
      widthPercent: 10,
      minWidth: 120,
      render: (timelineEvent) => (
        <div className="group-hover:ctw-underline">{timelineEvent.date}</div>
      ),
    },
    {
      render: (timelineEvent) => (
        <div>
          <div className="ctw-font-medium">{timelineEvent.type}</div>
          <div>{timelineEvent.subtype}</div>
        </div>
      ),
    },
    {
      render: (timelineEvent) => (
        <div>
          {timelineEvent.actor.map((row) => (
            <div>{row}</div>
          ))}
        </div>
      ),
    },
    {
      render: (timelineEvent) => (
        <div>
          <SimpleMoreList
            items={timelineEvent.modifiers}
            limit={3}
            total={timelineEvent.modifiers.length}
          />
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
