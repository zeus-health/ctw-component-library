import { DiagnosticReportModel } from "@/fhir/models";

type DiagnosticReportHeaderProps = {
  diagnosticReport: DiagnosticReportModel;
};

export const DiagnosticReportHeader = ({
  diagnosticReport,
}: DiagnosticReportHeaderProps) => (
  <div className="ctw-py-1">
    <div className="ctw-text-2xl">{diagnosticReport.displayName}</div>
  </div>
);
