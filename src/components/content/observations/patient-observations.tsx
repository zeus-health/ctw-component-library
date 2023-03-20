import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsProps = {
  className?: cx.Argument;
} & ScrollingContainerProps;

const Component = ({
  className,
}: PatientObservationsProps) => {
  const diagnosticReports = usePatientDiagnosticReports();

  return (
    <PatientObservationsBase className={className} query={diagnosticReports} />
  );
};

export const PatientObservations = withErrorBoundary(
  Component,
  "PatientObservations"
);
