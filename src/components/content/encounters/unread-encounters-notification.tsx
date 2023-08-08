import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientEncounters } from "@/fhir/encounters";

export type UnreadEncounterssNotificationProps = {
  className?: string;
};

export const UnreadEncountersNotification = ({ className }: UnreadEncounterssNotificationProps) => {
  const query = usePatientEncounters();
  return <UnreadNotification className={className} data={query.data || []} />;
};
