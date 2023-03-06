import { Badge } from "@/components/core/badge";
import { usePatientConditionsOutside } from "@/fhir/conditions";

export const PatientConditionsOutsideBadge = () => {
  const otherConditionsQuery = usePatientConditionsOutside();
  const activeUnarchivedConditions = otherConditionsQuery.data.filter(
    (condition) => condition.displayStatus === "Active"
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
