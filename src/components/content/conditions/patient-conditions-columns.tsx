import cx from "classnames";
import { compact } from "lodash";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ConditionModel } from "@/fhir/models";

function statusToColor(status: string) {
  switch (status) {
    case "Active":
      return "ctw-text-success-main";
    case "Pending":
      return "ctw-text-caution-main";
    default:
      return "ctw-text-content-lighter";
  }
}

export const patientConditionsColumns: TableColumn<ConditionModel>[] = [
  {
    widthPercent: 30,
    minWidth: 320,
    render: (condition) => (
      <div>
        <div className="ctw-pc-title">{condition.display}</div>
        <div className="ctw-pc-chapter">{condition.ccsChapter}</div>
      </div>
    ),
  },
  {
    render: (condition) => (
      <div className="ctw-pc-status-container">
        <div
          className={cx("ctw-pc-status-dot", statusToColor(condition.status))}
        >
          &bull;
        </div>
        <div className="ctw-pc-status-and-extra">
          <div className="ctw-pc-status">{condition.status}</div>

          {condition.isSummaryResource ? (
            <div>
              {compact([
                condition.patient?.organization?.name,
                condition.recordedDate,
              ]).join(" ")}
            </div>
          ) : (
            <div>
              {compact([condition.recorder, condition.recordedDate]).join(" ")}
            </div>
          )}
        </div>
      </div>
    ),
    widthPercent: 30,
    minWidth: 128,
  },
  {
    widthPercent: 40,
    minWidth: 132,
    render: (condition) => {
      const onsetText = condition.isSummaryResource
        ? "Earliest known onset:"
        : "Onset:";

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
