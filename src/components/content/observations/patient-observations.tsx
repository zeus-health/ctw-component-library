import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientBuilderDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsProps) => {
  const diagnosticReports = usePatientBuilderDiagnosticReports();

  return <PatientObservationsBase className={className} query={diagnosticReports} />;
};

export const PatientObservations = withErrorBoundary(Component, "PatientObservations");
