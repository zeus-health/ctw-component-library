import cx from "classnames";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ConditionModel } from "@/fhir/models";
import { compact } from "@/utils/nodash";

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
    title: "Name",
    widthPercent: 30,
    minWidth: 320,
    render: (condition) => (
      <div>
        <div className="group-hover:ctw-underline">{condition.display}</div>
        <div className="ctw-pc-chapter">{condition.ccsChapter}</div>
      </div>
    ),
  },
  {
    title: "Status",
    render: (condition) => (
      <div className="ctw-pc-status-container">
        <div
          className={cx(
            "ctw-pc-status-dot",
            statusToColor(condition.displayStatus)
          )}
        >
          &bull;
        </div>
        <div>{condition.displayStatus}</div>
        <div className="ctw-pc-status-and-extra">
          <div>
            Last Updated:{" "}
            {compact([
              condition.recordedDate,
              condition.recorder ? `(${condition.recorder})` : "",
            ]).join(" ")}
          </div>
        </div>
      </div>
    ),
    widthPercent: 30,
    minWidth: 128,
  },
  {
    title: "Details",
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
