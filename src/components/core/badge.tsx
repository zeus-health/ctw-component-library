import cx from "classnames";

export type BadgeProps = {
  className?: string;
  color: "primary" | "gray" | "info" | "success" | "caution" | "error" | "notification";
  text: string;
};

export const Badge = ({ className, color, text }: BadgeProps) => {
  const colorClasses = {
    primary: "ctw-bg-primary-light ctw-text-primary-main",
    gray: "ctw-bg-bg-light ctw-text-content-light",
    info: "ctw-bg-info-light ctw-text-info-main",
    success: "ctw-bg-success-light ctw-text-success-main",
    caution: "ctw-bg-caution-light ctw-text-caution-main",
    error: "ctw-bg-error-light ctw-text-error-main",
    notification: "ctw-bg-notification-light ctw-text-notification-main",
  }[color];

  return (
    <span
      className={cx(
        className,
        colorClasses,
        "ctw-inline-flex ctw-rounded-full ctw-px-2 ctw-text-xs ctw-font-semibold ctw-leading-5"
      )}
    >
      {text}
    </span>
  );
};
