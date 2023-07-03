import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientMedications } from "@/hooks/use-medications";

export const PatientMedicationsOutsideBadge = () => {
  const { otherProviderMedications = [] } = usePatientMedications();
  const activeUnarchivedMedications = otherProviderMedications.filter(
    (medication) => !(medication.isDismissed || medication.isInactive)
  );

  if (activeUnarchivedMedications.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
