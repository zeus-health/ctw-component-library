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
            model.valueString && (
              <div className="ctw-text-sm ctw-font-medium">
                Result:{" "}
                <BubbleIcon
                  interpretation={model.interpretation}
                  result={model.valueString}
                  className={model.acceptedInterpretations}
                />
              </div>
            )
          : model.valueString && (
              <div className="ctw-text-sm ctw-font-medium">
                Result:{" "}
                <BubbleIcon result={model.valueString} className={model.acceptedInterpretations} />
              </div>
            )}
      </div>
    ),
  },
  {
    title: "Reference Range",
    render: (model) => (
      <div className="ctw-flex ctw-text-sm ctw-font-medium">
        {model.referenceRange && (
          <div>
            Reference Range: {model.referenceRange} {model.unit}
          </div>
        )}
      </div>
    ),
  },
];
