import { Badge } from "@/components/core/badge";
import { usePatientDiagnosticReportsOutside } from "@/fhir/diagnostic-report";

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
