import { useEffect, useState } from "react";
import { Details } from "../../core/collapsible-data-list-details";
import { ObservationsDetails } from "@/components/content/observations/helpers/details";
import { DiagnosticReportHeader } from "@/components/content/observations/helpers/header";
import { diagnosticReportData } from "@/components/content/observations/helpers/schema";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { findReference } from "@/fhir/resource-helper";
import { compact } from "@/utils/nodash";

export type ObservationProps = {
  diagnosticReport: DiagnosticReportModel;
  onClose: () => void;
  onEdit?: () => void;
};

export const ObservationDetails = withErrorBoundary(
  ({ diagnosticReport, onClose, onEdit }: ObservationProps) => {
    const [observationEntries, setObservationsEntries] = useState<
      ObservationModel[]
    >([]);

    useEffect(() => {
      setObservationsEntries(
        compact(
          diagnosticReport.results.map((o) => {
            const observation = findReference(
              "Observation",
              undefined,
              diagnosticReport.includedResources,
              o.reference
            );
            if (!observation) {
              return undefined;
            }
            return new ObservationModel(observation, {
              [diagnosticReport.id]: diagnosticReport.resource,
            });
          })
        )
      );
    }, [diagnosticReport]);

    return (
      <div
        className="ctw-space-y-6"
        data-zus-telemetry-namespace="Observations"
      >
        <DiagnosticReportHeader diagnosticReport={diagnosticReport} />
        <Details
          data={diagnosticReportData(diagnosticReport)}
          readOnly={!onEdit}
          onEdit={() => {
            onClose();
            onEdit?.();
          }}
        />
        <ObservationsDetails data={observationEntries} />
      </div>
    );
  },
  "Observations"
);
