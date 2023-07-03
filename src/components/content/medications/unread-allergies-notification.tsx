import { useEffect, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientMedications } from "@/hooks/use-medications";

export const UnreadMedicationsNotification = () => {
  const query = usePatientMedications();
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideMedications = query.data.filter(
    (med) => !med.isDismissed && !med.isRead && !med.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideMedications.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
