import { Badge } from "@/components/core/badge";
import { usePatientConditionsOutside } from "@/services/fqs/conditions";

export type PatientConditionsOutsideBadgeProps = {
  enableFQS?: boolean;
};

export const PatientConditionsOutsideBadge = ({
  enableFQS = false,
}: PatientConditionsOutsideBadgeProps) => {
  const otherConditionsQuery = usePatientConditionsOutside(enableFQS);
  const activeUnarchivedConditions = otherConditionsQuery.data.filter(
    (condition) => condition.active && !condition.isArchived
  );

  if (activeUnarchivedConditions.length > 0) {
    return (
      <Badge
        color="notification"
        text={activeUnarchivedConditions.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};
