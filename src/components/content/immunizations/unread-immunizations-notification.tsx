import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientImmunizations } from "@/fhir/immunizations";

export const UnreadImmunizationsNotification = () => {
  const query = usePatientImmunizations();
  const userBuilderId = useUserBuilderId();

  const unreadOutsideImmunizations = query.data.filter(
    (imm) => !imm.isDismissed && !imm.isRead && !imm.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideImmunizations.length > 0) {
    return (
      <span>
        <svg
          height={10}
          className="ctw-fill-notification-icon"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="5" />
        </svg>
      </span>
    );
  }
  return null;
};
