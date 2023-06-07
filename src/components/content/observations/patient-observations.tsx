import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientBuilderDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsProps = {
  className?: cx.Argument;
  enableFQS?: boolean;
};

const Component = ({ className, enableFQS = false }: PatientObservationsProps) => {
  const diagnosticReports = usePatientBuilderDiagnosticReports(enableFQS);

  return <PatientObservationsBase className={className} query={diagnosticReports} enableFQS />;
};

export const PatientObservations = withErrorBoundary(Component, "PatientObservations");