import { faArrowRight, faArrowTrendUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { BubbleIcon } from "./bubble";
import { useObservationsDetailsDrawer } from "./drawer";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { ObservationModel } from "@/fhir/models";

export type ObservationTrendsProps = {
  model: ObservationModel;
};

export const ObservationTrends = ({ model }: ObservationTrendsProps) => {
  const [isTrendsShown, setIsTrendsShown] = useState(false);
  const openDiagnosticReportDetails = useObservationsDetailsDrawer();
  const { trackInteraction } = useAnalytics();

  return (
    <AnalyticsProvider componentName="ObservationTrends">
      <div className="ctw-text-sm ctw-font-normal">
        {!model.isIncorrectlyCodedGlucose && model.trends && model.trends.length > 1 && (
          <div className="ctw-pt-2">
            <button
              aria-label="trends"
              className="ctw-btn-clear ctw-space-x-3"
              type="button"
              onClick={() => {
                trackInteraction("toggle_trend", {
                  action: isTrendsShown ? "collapse_trend" : "expand_trend",
                });
                setIsTrendsShown(!isTrendsShown);
              }}
            >
              <FontAwesomeIcon icon={faArrowTrendUp} />
              <span>Trends</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={cx("ctw-h-3 ctw-w-3 ctw-pr-1", {
                  "ctw-rotate-90": isTrendsShown,
                })}
              />
            </button>
            {isTrendsShown &&
              model.trends.map(
                (trend) =>
                  !trend.isIncorrectlyCodedGlucose && (
                    <div
                      tabIndex={0}
                      role="button"
                      key={trend.id}
                      className={cx("ctw-group/trends ctw-grid ctw-grid-cols-3 ctw-py-1 ctw-pl-4", {
                        "ctw-cursor-pointer hover:ctw-bg-bg-lighter": trend.diagnosticReport,
                      })}
                      onClick={() => {
                        if (trend.diagnosticReport) {
                          trackInteraction("open_diagnostic_report", { target: "btn" });
                          openDiagnosticReportDetails(trend.diagnosticReport);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && trend.diagnosticReport) {
                          trackInteraction("open_diagnostic_report", { target: "enter_key" });
                          openDiagnosticReportDetails(trend.diagnosticReport);
                        }
                      }}
                    >
                      <div
                        className={cx("ctw-relative ctw-w-24 ctw-text-sm", {
                          "ctw-font-semibold": trend.id === model.id,
                          "group-hover/trends:ctw-underline": trend.diagnosticReport,
                        })}
                      >
                        {trend.effectiveStart}
                      </div>
                      <BubbleIcon
                        result={trend.value}
                        interpretation={trend.interpretation}
                        className={cx(`${trend.acceptedInterpretations} ctw-w-fit`, {
                          "!ctw-font-semibold": trend.id === model.id,
                        })}
                      />

                      {trend.diagnosticReport && (
                        <div className="ctw-justify-self-end">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ctw-invisible ctw-pr-2 ctw-text-content-lighter group-hover/trends:ctw-visible"
                          />
                        </div>
                      )}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </AnalyticsProvider>
  );
};
