import { Badge } from "@/components/core/badge";
import { useCTW } from "@/components/core/providers/use-ctw";
import { usePatientAllergies } from "@/fhir/allergies";

export const PatientAllergiesBadge = () => {
  const query = usePatientAllergies();
  const { builderId } = useCTW();
  const unreadOutsideAllergies = query.data.filter(
    (allergy) => !allergy.isDismissed && !allergy.isRead && !allergy.ownedByBuilder(builderId)
  );

  if (unreadOutsideAllergies.length > 0) {
    return (
      <Badge
        color="notification"
        text={unreadOutsideAllergies.length.toString()}
        className="ctw-h-5"
      />
    );
  }
  return null;
};
