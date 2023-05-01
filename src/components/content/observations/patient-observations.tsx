import cx from "classnames";
import { useEffect } from "react";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";
import { Telemetry } from "@/utils/telemetry";

export type PatientObservationsProps = {
  className?: cx.Argument;
};

const Component = ({ className }: PatientObservationsProps) => {
  const query = usePatientDiagnosticReports();

  useEffect(() => {
    if (!query.isLoading && query.data) {
      Telemetry.reportZAPRecordCount("builder_observations", query.data.length);
    }
  }, [query.isLoading, query.data]);

  return <PatientObservationsBase className={className} query={query} />;
};

export const PatientObservations = withErrorBoundary(Component, "PatientObservations");
