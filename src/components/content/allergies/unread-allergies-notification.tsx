import { useEffect, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientAllergies } from "@/fhir/allergies";

export const UnreadAllergiesNotification = () => {
  const query = usePatientAllergies();
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideAllergies = query.data.filter(
    (allergy) => !allergy.isDismissed && !allergy.isRead && !allergy.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideAllergies.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
