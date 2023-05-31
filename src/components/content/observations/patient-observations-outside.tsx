import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsOutsideProps = {
  className?: cx.Argument;
  enableFQS?: boolean;
};

const Component = ({ className, enableFQS = true }: PatientObservationsOutsideProps) => {
  const diagnosticReports = usePatientAllDiagnosticReports(enableFQS);

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
