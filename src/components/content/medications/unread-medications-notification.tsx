import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientDocuments } from "@/fhir/document";

export type UnreadMedicationsNotificationProps = {
  className?: string;
};

export const UnreadMedicationsNotification = ({
  className,
}: UnreadMedicationsNotificationProps) => {
  const query = usePatientDocuments();
  return <UnreadNotification className={className} query={query} />;
};
