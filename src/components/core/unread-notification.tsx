import { useEffect, useState } from "react";
import { useCTW } from "./providers/use-ctw";
import { UnreadNotificationIcon } from "./unread-notification-icon";
import { FHIRModel } from "@/fhir/models/fhir-model";

export type UnreadNotificationProps = {
  className?: string;
  query: {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    data: FHIRModel<fhir4.Resource>[];
  };
};

export const UnreadNotification = ({ className, query }: UnreadNotificationProps) => {
  const { getRequestContext } = useCTW();

  const [userBuilderId, setUserBuilderId] = useState("");

  useEffect(() => {
    async function load() {
      const requestContext = await getRequestContext();
      setUserBuilderId(requestContext.builderId);
    }

    void load();
  }, [getRequestContext]);

  const unreadOutsideRecords = query.data.filter(
    (record) => !record.isDismissed && !record.isRead && !record.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideRecords.length > 0) {
    return <UnreadNotificationIcon className={className} />;
  }
  return null;
};
