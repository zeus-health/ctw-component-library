import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientAllergies } from "@/fhir/allergies";

export const UnreadAllergiesNotification = () => {
  const query = usePatientAllergies();
  const userBuilderId = useUserBuilderId();

  const unreadOutsideAllergies = query.data.filter(
    (allergy) => !allergy.isDismissed && !allergy.isRead && !allergy.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideAllergies.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
