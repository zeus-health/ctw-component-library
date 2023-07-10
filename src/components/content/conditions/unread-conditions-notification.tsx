import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientConditionsOutside } from "@/services/conditions";

export const UnreadConditionsNotification = () => {
  const query = usePatientConditionsOutside();
  const userBuilderId = useUserBuilderId();

  const unreadOutsideConditions = query.data.filter(
    (condition) =>
      !condition.isDismissed && !condition.isRead && !condition.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideConditions.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
