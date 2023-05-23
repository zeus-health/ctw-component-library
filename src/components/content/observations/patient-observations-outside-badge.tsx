import { Badge } from "@/components/core/badge";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";

export const PatientObservationsOutsideBadge = () => {
  const { data = [] } = usePatientAllDiagnosticReports();
  const unarchivedObservations = data.filter((observation) => !observation.isArchived);

  return unarchivedObservations.length ? (
    <Badge
      color="notification"
      text={unarchivedObservations.length.toString()}
      className="ctw-h-5"
    />
  ) : null;
};
