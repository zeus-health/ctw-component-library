import { useEffect, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientConditionsOutside } from "@/services/conditions";

export const UnreadConditionsNotification = () => {
  const query = usePatientConditionsOutside();
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideConditions = query.data.filter(
    (condition) =>
      !condition.isDismissed && !condition.isRead && !condition.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideConditions.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
