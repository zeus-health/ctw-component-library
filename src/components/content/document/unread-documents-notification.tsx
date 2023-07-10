import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientDocuments } from "@/fhir/document";

export const UnreadDocumentsNotification = () => {
  const query = usePatientDocuments();
  const userBuilderId = useUserBuilderId();

  const unreadOutsideDocuments = query.data.filter(
    (d) => !d.isDismissed && !d.isRead && !d.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideDocuments.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
