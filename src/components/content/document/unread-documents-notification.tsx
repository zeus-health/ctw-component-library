import { useEffect, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { UnreadNotification } from "@/components/core/unread-notification";
import { usePatientDocuments } from "@/fhir/document";

export const UnreadDocumentsNotification = () => {
  const query = usePatientDocuments();
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideDocuments = query.data.filter(
    (d) => !d.isDismissed && !d.isRead && !d.ownedByBuilder(userBuilderId)
  );

  console.log(query.data);

  if (unreadOutsideDocuments.length > 0) {
    return <UnreadNotification />;
  }
  return null;
};
