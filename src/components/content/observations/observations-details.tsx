import { useEffect, useState } from "react";
import { DetailsCard } from "../resource/helpers/details-card";
import { ObservationsTable } from "@/components/content/observations/helpers/observations-table";
import { diagnosticReportData } from "@/components/content/observations/helpers/schema";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { findReference } from "@/fhir/resource-helper";
import { compact } from "@/utils/nodash";

export type ObservationDetailsProps = {
  diagnosticReport: DiagnosticReportModel;
};

export const Component = ({ diagnosticReport }: ObservationDetailsProps) => {
  const [observationEntries, setObservationsEntries] = useState<ObservationModel[]>([]);

  useEffect(() => {
    setObservationsEntries(
      compact(
        diagnosticReport.results.map((result) => {
          const observation = findReference(
            "Observation",
            undefined,
            diagnosticReport.includedResources,
            result.reference
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
    <div className="ctw-space-y-6" data-zus-telemetry-namespace="Observations">
      <div className="ctw-py-1">
        <div className="ctw-text-2xl">{diagnosticReport.displayName}</div>
      </div>

      <DetailsCard details={diagnosticReportData(diagnosticReport)} />
      <ObservationsTable data={observationEntries} />
    </div>
  );
};

export const ObservationDetails = withErrorBoundary(Component, "Observations");
