import { Badge } from "./badge";

export type UnreadNotificationIconProps = {
  className?: string;
  text?: string;
};

export const UnreadNotificationIcon = ({
  className = "ctw-fill-notification-icon",
  text,
}: UnreadNotificationIconProps) =>
  text ? (
    <Badge text={text} className={className} color="notification" />
  ) : (
    <svg height={10} className={className} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
