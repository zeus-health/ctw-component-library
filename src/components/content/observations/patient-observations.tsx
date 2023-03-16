import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsProps) => {
  const diagnosticReports = usePatientDiagnosticReports();

  return (
    <div className={cx(className, "ctw-patient-observations")}>
      <PatientObservationsBase query={diagnosticReports} />
    </div>
  );
};

export const PatientObservations = withErrorBoundary(
  Component,
  "PatientObservations"
);
