import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsOutsideProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsOutsideProps) => {
  const diagnosticReports = usePatientAllDiagnosticReports();

  return (
    <PatientObservationsBase
      query={diagnosticReports}
      className={cx(className, "ctw-scrollable-pass-through-height")}
    />
  );
};

export const PatientObservationsOutside = withErrorBoundary(
  Component,
  "PatientObservationsOutside"
);
