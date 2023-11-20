import { useUserBuilderId } from "./providers/user-builder-id";
import { UnreadNotificationIcon } from "./unread-notification-icon";
import { FHIRModel } from "@/fhir/models/fhir-model";

export type UnreadNotificationProps = {
  className?: string;
  data: FHIRModel<fhir4.Resource>[] | undefined;
};

export const UnreadNotification = ({ className, data }: UnreadNotificationProps) => {
  const userBuilderId = useUserBuilderId();

  const unreadOutsideRecords =
    data?.filter(
      (record) => !record.isDismissed && !record.isRead && !record.ownedByBuilder(userBuilderId)
    ) ?? [];

  if (unreadOutsideRecords.length > 0) {
    return <UnreadNotificationIcon className={className} />;
  }
  return null;
};
