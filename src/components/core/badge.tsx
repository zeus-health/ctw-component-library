import cx from "classnames";

export type BadgeProps = {
  className?: string;
  color: "primary" | "gray" | "info" | "good" | "caution" | "alert";
  text: string;
};

export const Badge = ({ className, color, text }: BadgeProps) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-800",
    gray: "bg-gray-100 text-gray-800",
    info: "bg-info-100 text-info-800",
    good: "bg-good-100 text-good-800",
    caution: "bg-caution-100 text-caution-800",
    alert: "bg-alert-100 text-alert-800",
  }[color];

  return (
    <span
      className={cx(
        className,
        colorClasses,
        "inline-flex rounded-full px-2 text-xs font-semibold leading-5"
      )}
    >
      {text}
    </span>
  );
};
