import cx from "classnames";
import { useEffect } from "react";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReportsOutside } from "@/fhir/diagnostic-report";
import { Telemetry } from "@/utils/telemetry";

export type PatientObservationsOutsideProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsOutsideProps) => {
  const query = usePatientDiagnosticReportsOutside();

  useEffect(() => {
    if (!query.isLoading) {
      Telemetry.reportZAPRecordCount("outside_observations", query.data?.length);
    }
  }, [query.isLoading, query.data]);

  return (
    <PatientObservationsBase
      query={query}
      className={cx(className, "ctw-scrollable-pass-through-height")}
    />
  );
};

export const PatientObservationsOutside = withErrorBoundary(
  Component,
  "PatientObservationsOutside"
);
