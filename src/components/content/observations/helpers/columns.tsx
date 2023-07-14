import { BubbleIcon } from "./bubble";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

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
    title: "Component",
    render: (model) => <div className="ctw-flex ctw-flex-wrap ctw-text-base">{model.display}</div>,
  },
  {
    title: "Result",
    render: (model) => (
      <div className="ctw-flex">
        {model.interpretation
          ? model.interpretation &&
            model.value && (
              <div className="ctw-text-sm ctw-font-normal">
                Result:{" "}
                <BubbleIcon
                  interpretation={model.interpretation}
                  result={model.value}
                  className={model.acceptedInterpretations}
                />
              </div>
            )
          : model.value && (
              <div className="ctw-text-sm ctw-font-normal">
                Result:{" "}
                <BubbleIcon result={model.value} className={model.acceptedInterpretations} />
              </div>
            )}
      </div>
    ),
  },
  {
    title: "Reference Range",
    render: (model) => (
      <div className="ctw-flex ctw-text-sm ctw-font-normal">
        {model.referenceRange && (
          <div className="ctw-font-normal">
            Reference Range: {model.referenceRange} {model.unit}
          </div>
        )}
      </div>
    ),
  },
  {
    title: "Trends",
    render: (model) => (
      <div className="ctw-flex ctw-text-sm ctw-font-normal">
        {model.trends.length > 1 && (
          <div className="ctw-font-normal">
            Trends:
            {model.trends.forEach((t) => {
              console.log("trend", t);
              return t.kind;
            })}
          </div>
        )}
      </div>
    ),
  },
];
