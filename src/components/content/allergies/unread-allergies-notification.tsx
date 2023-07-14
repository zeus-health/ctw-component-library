import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientAllergies } from "@/fhir/allergies";

export type UnreadAllergiesNotificationProps = {
  className?: string;
};

export const UnreadAllergiesNotification = ({ className }: UnreadAllergiesNotificationProps) => {
  const query = usePatientAllergies();
  return <UnreadNotification className={className} data={query.data} />;
};
