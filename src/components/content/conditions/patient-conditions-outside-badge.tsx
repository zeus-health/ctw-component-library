import { Badge } from "@/components/core/badge";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { usePatientConditionsOutside } from "@/services/conditions";

export const PatientConditionsOutsideBadge = () => {
  const enableFQS = useFQSFeatureToggle("conditions");
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
