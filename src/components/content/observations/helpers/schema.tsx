import { HistoryEntryProps } from "../../resource/helpers/history-entry";
import { DiagnosticReportModel, ObservationModel } from "@/fhir/models";
import { capitalize, startCase } from "@/utils/nodash";

export function setupData(observation: ObservationModel): HistoryEntryProps {
  const detailData = [
    {
      label: "Identifier",
      value: observation.identifier,
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
    details: detailData,
  };
}

export const diagnosticReportData = (diagnosticReport: DiagnosticReportModel) => [
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
