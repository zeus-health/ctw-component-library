import { SimpleMoreList } from "@/components/core/simple-more-list";
import { TableColumn } from "@/components/core/table/table-helpers";
import { TimelineEventModel } from "@/fhir/models/timeline-event";

export const patientTimelineColumns: TableColumn<TimelineEventModel>[] = [
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
