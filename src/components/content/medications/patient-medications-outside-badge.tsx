import { UnreadNotification } from "@/components/core/unread-notification";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export const PatientMedicationsOutsideBadge = () => {
  const { otherProviderMedications = [] } = useQueryAllPatientMedications();
  const activeUnarchivedMedications = otherProviderMedications.filter(
    (medication) => !(medication.isDismissed || medication.isInactive)
  );

  if (activeUnarchivedMedications.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
