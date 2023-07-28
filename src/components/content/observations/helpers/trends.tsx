import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { BubbleIcon } from "./bubble";
import { useObservationsDetailsDrawer } from "./drawer";
import { ObservationModel } from "@/fhir/models";
import { Telemetry } from "@/utils/telemetry";

export type ObservationTrendsProps = {
  model: ObservationModel;
};

export const ObservationTrends = ({ model }: ObservationTrendsProps) => {
  const [isTrendsShown, setIsTrendsShown] = useState(false);
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();

  return (
    <div className="ctw-text-sm ctw-font-normal">
      {model.trends.length > 1 && (
        <div className="ctw-pt-2">
          <button
            aria-label="trends"
            className="ctw-btn-clear"
            type="button"
            onClick={() => {
              Telemetry.trackInteraction(
                isTrendsShown ? "CollapsedTrendNotShown" : "ExpandedTrendShown"
              );
              setIsTrendsShown(!isTrendsShown);
            }}
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
                  className={cx(`${trend.acceptedInterpretations}`, {
                    "!ctw-font-bold": trend.id === model.id,
                  })}
                />

                {trend.diagnosticReport && (
                  <button
                    type="button"
                    onClick={() =>
                      trend.diagnosticReport && openDiagnosticReportDetails(trend.diagnosticReport)
                    }
                  >
                    go
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
