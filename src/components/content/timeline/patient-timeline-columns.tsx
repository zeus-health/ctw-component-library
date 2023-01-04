import { TableColumn } from "@/components/core/table/table-helpers";
import { EncounterModel } from "@/fhir/models/encounter";

export const patientTimelineColumns: TableColumn<EncounterModel>[] = [
  {
    widthPercent: 20,
    minWidth: 150,
    render: (encounter) => (
      <div>
        <div className="ctw-pt-title group-hover:ctw-underline">
          {encounter.periodStart}
        </div>
        <div className="ctw-pt-chapter">{encounter.type}</div>
      </div>
    ),
  },
  {
    widthPercent: 40,
    minWidth: 250,
    render: (encounter) => (
      <div>
        <div className="ctw-pt-title">{encounter.location}</div>
        <div>{encounter.participants}</div>
      </div>
    ),
  },
  {
    widthPercent: 40,
    minWidth: 200,
    render: (encounter) => <div />,
  },
];
