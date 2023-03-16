import cx from "classnames";
import { PatientObservationsBase } from "@/components/content/observations/helpers/base";
import { Badge } from "@/components/core/badge";
import {
  ScrollableContainer,
  ScrollingContainerProps,
} from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientDiagnosticReportsOutside } from "@/fhir/diagnostic-report";

export type PatientObservationsOutsideProps = {
  className?: cx.Argument;
} & ScrollingContainerProps;

const Component = ({
  className,
  scrollingEnabled = false,
  height,
}: PatientObservationsOutsideProps) => {
  const diagnosticReports = usePatientDiagnosticReportsOutside();

  return (
    <ScrollableContainer
      height={height}
      scrollingEnabled={scrollingEnabled}
      className={cx(className, "ctw-patient-observations")}
    >
      <PatientObservationsBase
        query={diagnosticReports}
        scrollingEnabled={!!(height || scrollingEnabled)}
      />
    </ScrollableContainer>
  );
};

export const PatientObservationsOutside = withErrorBoundary(
  Component,
  "PatientObservationsOutside"
);

export const PatientObservationsOutsideBadge = () => {
  const { data = [] } = usePatientDiagnosticReportsOutside();

  return data.length ? (
    <Badge
      color="notification"
      text={data.length.toString()}
      className="ctw-h-5"
    />
  ) : null;
};
