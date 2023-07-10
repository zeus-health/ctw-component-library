import { useUserBuilderId } from "./providers/user-builder-id";
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
  const userBuilderId = useUserBuilderId();

  const unreadOutsideRecords = query.data.filter(
    (record) => !record.isDismissed && !record.isRead && !record.ownedByBuilder(userBuilderId)
  );

  if (unreadOutsideRecords.length > 0) {
    return <UnreadNotificationIcon className={className} />;
  }
  return null;
};
