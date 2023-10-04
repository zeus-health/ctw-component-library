import { numRecordsToLookbackForUnread } from "../unread-records-notification";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientTopLevelDocuments } from "@/fhir/document";

export type UnreadDocumentsNotificationProps = {
  className?: string;
};

export const UnreadDocumentsNotification = ({ className }: UnreadDocumentsNotificationProps) => {
  const query = usePatientTopLevelDocuments(numRecordsToLookbackForUnread);
  return <UnreadNotification className={className} data={query.data} />;
};
