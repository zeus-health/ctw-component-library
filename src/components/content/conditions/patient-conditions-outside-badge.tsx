import { UnreadNotificationIcon } from "@/components/core/unread-notification-icon";
import { usePatientConditionsOutside } from "@/services/conditions";

export const PatientConditionsOutsideBadge = () => {
  const otherConditionsQuery = usePatientConditionsOutside();
  const activeUnarchivedConditions = otherConditionsQuery.data.filter(
    (condition) => condition.active && !condition.isDismissed
  );

  if (activeUnarchivedConditions.length > 0) {
    return <UnreadNotificationIcon />;
  }
  return null;
};
