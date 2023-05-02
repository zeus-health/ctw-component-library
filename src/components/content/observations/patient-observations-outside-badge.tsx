import { Badge } from "@/components/core/badge";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";

export const PatientObservationsOutsideBadge = () => {
  const { data = [] } = usePatientAllDiagnosticReports();

  return data.length ? (
    <Badge color="notification" text={data.length.toString()} className="ctw-h-5" />
  ) : null;
};
