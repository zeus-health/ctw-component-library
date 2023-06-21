import { Badge } from "@/components/core/badge";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export const PatientMedicationsOutsideBadge = () => {
  const { otherProviderMedications = [] } = useQueryAllPatientMedications();
  const activeUnarchivedMedications = otherProviderMedications.filter(
    (medication) => !(medication.isArchived || medication.isInactive)
  );

  if (activeUnarchivedMedications.length > 0) {
    return (
      <Badge
        color="notification"
        text={activeUnarchivedMedications.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};
