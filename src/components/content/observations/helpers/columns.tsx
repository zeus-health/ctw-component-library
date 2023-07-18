import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
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

export const ObservationsColumns = (): TableColumn<ObservationModel>[] => {
  const [isTrendsShown, setIsTrendsShown] = useState(false);
  return [
    {
      title: "Component",
      render: (model) => (
        <div className="ctw-flex ctw-flex-wrap ctw-text-base">{model.display}</div>
      ),
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
        <div className="ctw-text-sm ctw-font-normal">
          {model.trends.length > 1 && (
            <div className="ctw-pt-2">
              <button
                aria-label="trends"
                className="ctw-btn-clear"
                type="button"
                onClick={() => setIsTrendsShown(!isTrendsShown)}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={cx("ctw-h-3 ctw-w-3 ctw-pr-1", {
                    "ctw-rotate-90": isTrendsShown,
                  })}
                />
                Trends
              </button>
              {isTrendsShown &&
                model.trends.map((trend) => (
                  <div key={trend.id} className="ctw-ml-4 ctw-py-px">
                    <div
                      className={cx("ctw-relative ctw-top-1 ctw-float-left ctw-w-24 ctw-text-sm", {
                        "ctw-font-bold": trend.id === model.id,
                      })}
                    >
                      {trend.effectiveStart}
                    </div>
                    <BubbleIcon
                      result={trend.value}
                      interpretation={trend.interpretation}
                      className={trend.acceptedInterpretations}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      ),
    },
  ];
};
