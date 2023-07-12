import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";

export type UnreadDiagnosticReportsNotificationProps = {
  className?: string;
};

export const UnreadDiagnosticReportsNotification = ({
  className,
}: UnreadDiagnosticReportsNotificationProps) => {
  const query = usePatientAllDiagnosticReports();
  return <UnreadNotification className={className} data={query.data ?? []} />;
};
