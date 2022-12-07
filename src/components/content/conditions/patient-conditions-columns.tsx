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
        <div className="ctw-text-base ctw-text-content-black">
          {condition.display}
        </div>
        <div className="ctw-font-normal">{condition.ccsChapter}</div>
      </div>
    ),
  },
  {
    render: (condition) => (
      <div className="ctw-flex ctw-space-x-2">
        <div className={cx("ctw-text-base", statusToColor(condition.status))}>
          &bull;
        </div>
        <div>
          <div className="ctw-text-base ctw-capitalize ctw-text-content-black">
            {condition.status}
          </div>

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
    widthPercent: 30,
    minWidth: 132,
    render: (condition) => (
      <div>
        {condition.isSummaryResource ? (
          <div>Earliest known onset date: {condition.onset}</div>
        ) : (
          <div>Onset date: {condition.onset}</div>
        )}
        <div className="ctw-line-clamp-3">{condition.notes.join(" ")}</div>
      </div>
    ),
  },
];
