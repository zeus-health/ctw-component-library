import cx from "classnames";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { capitalize, startCase } from "@/utils/nodash";

export const diagnosticReportColumns: TableColumn<DiagnosticReportModel>[] = [
  {
    title: "Report",
    widthPercent: 30,
    minWidth: 320,
    dataIndex: "displayName",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Started On",
    dataIndex: "effectiveStart",
  },
  {
    title: "Status",
    render: (model) => (
      <div className="ctw-flex">
        <div className={cx("ctw-text-md", statusToColor(model.resource.status))}>&bull;</div>
        <div className="ctw-ml-1">
          <div>{capitalize(model.resource.status)}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Observations",
    render: (model) => <div className="ctw-text-center">{model.results.length}</div>,
  },
];

export const observationsColumns: TableColumn<ObservationModel>[] = [
  {
    title: "Observation Info",
    render: (model) => (
      <div className="ctw-flex">
        {model.effectiveStart && (
          <div>
            <span className="ctw-inline-flex ctw-h-5 ctw-rounded-full ctw-bg-notification-light ctw-px-2 ctw-text-xs ctw-leading-5 ctw-text-notification-main">
              {model.effectiveStart}
            </span>{" "}
          </div>
        )}
        <div className={cx("ctw-text-md", statusToColor(model.resource.status))}>&bull;</div>
        <div className="ctw-ml-1">
          <div>{capitalize(model.resource.status)} </div>
        </div>
      </div>
    ),
  },
  {
    title: "Date and Id",
    render: (model) => (
      <div className="ctw-ml-1">
        {startCase(model.category) || model.display} {model.resource.identifier?.[0].value}
      </div>
    ),
  },
  {
    title: "Reading",
    render: (model) => (
      <div className="ctw-ml-1">
        {model.value} {model.interpretation}
      </div>
    ),
  },
  {
    title: "Notes",
    render: (model) =>
      model.notes && (
        <blockquote className="ctw-mx-3 ctw-my-1 ctw-rounded ctw-bg-bg-lighter ctw-p-1.5 ctw-text-xs ctw-font-light ctw-italic">
          {model.notes}
        </blockquote>
      ),
  },
];

function statusToColor(status: fhir4.DiagnosticReport["status"] | fhir4.Observation["status"]) {
  switch (status) {
    case "final":
    case "amended":
    case "appended":
    case "corrected":
      return "ctw-text-success-main";
    case "cancelled":
    case "entered-in-error":
      return "ctw-text-caution-main";
    case "registered":
    case "partial":
    case "preliminary":
    case "unknown":
    default:
      return "ctw-text-content-lighter";
  }
}
