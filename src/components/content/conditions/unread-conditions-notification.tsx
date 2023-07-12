import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientConditionsAll } from "@/services/conditions";

export type UnreadConditionsNotificationProps = {
  className?: string;
};

export const UnreadConditionsNotification = ({ className }: UnreadConditionsNotificationProps) => {
  const query = usePatientConditionsAll();
  return <UnreadNotification className={className} data={query.data} />;
};
