import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientImmunizations } from "@/fhir/immunizations";

export type UnreadImmunizationsNotificationProps = {
  className?: string;
};

export const UnreadImmunizationsNotification = ({
  className,
}: UnreadImmunizationsNotificationProps) => {
  const query = usePatientImmunizations();
  return <UnreadNotification className={className} data={query.data} />;
};
