import { SimpleMoreList } from "@/components/core/simple-more-list";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { TimelineEventModel } from "@/fhir/models/timeline-event";

export const patientTimelineColumns = (includeViewFhirResource = false) => {
  const timelineColumns: TableColumn<TimelineEventModel>[] = [
    {
      title: "Date",
      widthPercent: 10,
      minWidth: 120,
      dataIndex: "date",
    },
    {
      title: "Type",
      render: (timelineEvent) => (
        <div>
          <div className="ctw-font-medium">{timelineEvent.type}</div>
          <div>{timelineEvent.subtype}</div>
        </div>
      ),
    },
    {
      title: "Actor",
      render: (timelineEvent) => (
        <>
          {timelineEvent.actorDetails.map((detail) => (
            <div className="ctw-capitalize" key={detail}>
              {detail.toLocaleLowerCase()}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Modifiers",
      render: (timelineEvent) => (
        <SimpleMoreList
          items={timelineEvent.modifiers}
          limit={3}
          total={timelineEvent.modifiers.length}
        />
      ),
    },
  ];

  if (includeViewFhirResource) {
    timelineColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (encounter) => <ViewFHIR name="Encounter Resource" resource={encounter.resource} />,
    });
  }

  return timelineColumns;
};
