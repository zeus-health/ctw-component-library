import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { capitalize, startCase } from "@/utils/nodash";

export function setupData(
  observation: ObservationModel
): CollapsibleDataListProps {
  const detailData = [
    {
      label: "Identifier",
      value: observation.resource.identifier?.[0].value,
    },
    {
      label: "Service category",
      value: observation.category,
    },
    {
      label: "Status",
      value: capitalize(observation.resource.status),
    },
    {
      label: "Value",
      value: observation.value,
    },
    {
      label: "Interpretation",
      value: observation.interpretation,
    },
  ];

  return {
    id: observation.id,
    date: observation.effectiveStart,
    title: startCase(observation.category),
    subtitle: observation.display,
    data: detailData,
  };
}

export const diagnosticReportData = (
  diagnosticReport: DiagnosticReportModel
) => [
  { label: "Organization", value: diagnosticReport.performer },
  {
    label: "Identifier",
    value: diagnosticReport.resource.identifier?.[0].value,
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
