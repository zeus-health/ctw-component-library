import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientEncounters } from "@/fhir/encounters";

export type UnreadConditionsNotificationProps = {
  className?: string;
};

export const UnreadConditionsNotification = ({ className }: UnreadConditionsNotificationProps) => {
  const query = usePatientEncounters();
  return <UnreadNotification className={className} data={query.data || []} />;
};
