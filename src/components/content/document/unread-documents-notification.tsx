import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientDocuments } from "@/fhir/document";

export type UnreadDocumentsNotificationProps = {
  className?: string;
};

export const UnreadDocumentsNotification = ({ className }: UnreadDocumentsNotificationProps) => {
  const query = usePatientDocuments();
  return <UnreadNotification className={className} data={query.data} />;
};
