import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ConditionModel } from "@/fhir/models";

export const patientConditionsColumns: TableColumn<ConditionModel>[] = [
  {
    title: "Name",
    widthPercent: 40,
    minWidth: 320,
    render: (condition) => (
      <div>
        <div className="ctw-font-medium group-hover:ctw-underline">{condition.display}</div>
        <div className="ctw-pc-chapter">{condition.ccsChapter}</div>
      </div>
    ),
  },
  {
    title: "Status",
    minWidth: 128,
    render: (condition) => (
      <div>
        <div>{condition.recordedDate}</div>
        <div>{condition.recorder}</div>
      </div>
    ),
  },
  {
    title: "Details",
    widthPercent: 40,
    minWidth: 132,
    render: (condition) => {
      const onsetText = condition.isSummaryResource ? "Earliest known onset:" : "Onset:";

      return (
        <div className="ctw-pc-onset-notes">
          {condition.onset && (
            <div>
              {onsetText} {condition.onset}
            </div>
          )}
          <div className="ctw-pc-notes">{condition.notes.join(" ")}</div>
        </div>
      );
    },
  },
];

export const patientConditionsAllColumns = (builderId: string): TableColumn<ConditionModel>[] => [
  {
    title: "Name",
    widthPercent: 40,
    minWidth: 320,
    render: (condition) => (
      <ResourceTitleColumn
        title={condition.display}
        subTitle={condition.ccsChapter}
        ownedByBuilder={condition.ownedByBuilder(builderId)}
      />
    ),
  },
  {
    title: "Last Updated",
    minWidth: 200,
    render: (condition) => (
      <div>
        <div>{condition.recordedDate}</div>
        <div>{condition.recorder}</div>
      </div>
    ),
  },
  {
    title: "Details",
    minWidth: 132,
    render: (condition) => {
      const onsetText = condition.isSummaryResource ? "Earliest known onset:" : "Onset:";

      return (
        <div className="ctw-pc-onset-notes">
          {condition.onset && (
            <div>
              {onsetText} {condition.onset}
            </div>
          )}
          <div className="ctw-pc-notes">{condition.notes.join(" ")}</div>
        </div>
      );
    },
  },
];
