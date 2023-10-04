import { numRecordsToLookbackForUnread } from "../unread-records-notification";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientDiagnosticReports } from "@/fhir/diagnostic-report";

export type UnreadDiagnosticReportsNotificationProps = {
  className?: string;
};

export const UnreadDiagnosticReportsNotification = ({
  className,
}: UnreadDiagnosticReportsNotificationProps) => {
  const query = usePatientDiagnosticReports(numRecordsToLookbackForUnread);
  return <UnreadNotification className={className} data={query.data} />;
};
