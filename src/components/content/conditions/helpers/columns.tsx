import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ConditionModel } from "@/fhir/models";
import { capitalize, compact } from "@/utils/nodash";

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
      <div className="ctw-pc-status-container">
        <div className={cx("ctw-pc-status-dot", statusToColor(condition.displayStatus))}>
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
      <div>
        <div className="ctw-flow-root group-hover:ctw-underline">
          {capitalize(condition.display)}
          <span className="ctw-float-right">
            {condition.ownedByBuilder(builderId) ? (
              <FontAwesomeIcon className="ctw-text-content-light" icon={faCircleCheck} />
            ) : (
              <></>
            )}
          </span>
        </div>
        <div>{condition.ccsChapter}</div>
      </div>
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
