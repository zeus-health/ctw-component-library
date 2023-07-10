import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientConditionsOutside } from "@/services/conditions";

export type UnreadConditionsNotificationProps = {
  className?: string;
};

export const UnreadConditionsNotification = ({ className }: UnreadConditionsNotificationProps) => {
  const query = usePatientConditionsOutside();
  return <UnreadNotification className={className} query={query} />;
};
