import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import {
  ScrollableContainer,
  ScrollingContainerProps,
} from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";

export type PatientObservationsProps = {
  className?: cx.Argument;
} & ScrollingContainerProps;

const Component = ({
  className,
  scrollingEnabled = false,
  height,
}: PatientObservationsProps) => {
  const diagnosticReports = usePatientDiagnosticReports();

  return (
    <ScrollableContainer
      height={height}
      scrollingEnabled={scrollingEnabled}
      className={cx(className, "ctw-patient-observations")}
    >
      <PatientObservationsBase
        query={diagnosticReports}
        scrollingEnabled={!!(scrollingEnabled || height)}
      />
    </ScrollableContainer>
  );
};

export const PatientObservations = withErrorBoundary(
  Component,
  "PatientObservations"
);
