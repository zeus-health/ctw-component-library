import { useEffect, useState } from "react";
import { ObservationsTable } from "@/components/content/observations/helpers/observations-table";
import { Details } from "@/components/core/collapsible-data-list-details";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { findReference } from "@/fhir/resource-helper";
import { capitalize, compact } from "@/utils/nodash";

export type ObservationDetailsProps = {
  diagnosticReport: DiagnosticReportModel;
};

export const diagnosticReportData = (
  diagnosticReport: DiagnosticReportModel
) => [
  { label: "Organization", value: diagnosticReport.performer },
  {
    label: "Identifier",
    value: diagnosticReport.identifier,
  },
  {
    label: "Service category",
    value: diagnosticReport.category,
  },
  {
    label: "Status",
    value: capitalize(diagnosticReport.resource.status),
  },
];

export const Component = ({ diagnosticReport }: ObservationDetailsProps) => {
  const [observationEntries, setObservationsEntries] = useState<
    ObservationModel[]
  >([]);

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
      <div className="ctw-text-2xl">{diagnosticReport.displayName}</div>

      <Details data={diagnosticReportData(diagnosticReport)} />
      <ObservationsTable data={observationEntries} />
    </div>
  );
};

export const ObservationDetails = withErrorBoundary(Component, "Observations");
