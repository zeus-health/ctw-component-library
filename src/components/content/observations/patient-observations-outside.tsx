import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReportsOutside } from "@/fhir/diagnostic-report";

export type PatientObservationsOutsideProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsOutsideProps) => {
  const diagnosticReports = usePatientDiagnosticReportsOutside();

  return (
    <div
      className={cx(
        className,
        "ctw-patient-observations ctw-scrollable-pass-through-height"
      )}
    >
      <PatientObservationsBase
        query={diagnosticReports}
        className="ctw-scrollable-pass-through-height"
      />
    </div>
  );
};

export const PatientObservationsOutside = withErrorBoundary(
  Component,
  "PatientObservationsOutside"
);
