import { Badge } from "@/components/core/badge";
import { useQueryAllPatientMedications } from "@/hooks/use-medications";

export type PatientMedicationsOutsideBadgeProps = {
  enableFQS?: boolean;
};

export const PatientMedicationsOutsideBadge = ({
  enableFQS = false,
}: PatientMedicationsOutsideBadgeProps) => {
  const { otherProviderMedications = [] } = useQueryAllPatientMedications(enableFQS);
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
