export type UnreadNotificationIconProps = {
  className?: string;
};

export const UnreadNotificationIcon = ({
  className = "ctw-fill-notification-icon",
}: UnreadNotificationIconProps) => (
  <svg height={10} className={className} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="5" />
  </svg>
);
