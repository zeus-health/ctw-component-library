import { UnreadNotification } from "@/components/core/unread-notification";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type UnreadMedicationsNotificationProps = {
  className?: string;
};

export const UnreadMedicationsNotification = ({
  className,
}: UnreadMedicationsNotificationProps) => {
  const query = useQueryAllPatientMedications();
  return <UnreadNotification className={className} data={query.allMedications} />;
};
