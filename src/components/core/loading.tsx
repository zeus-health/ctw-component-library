import cx from "classnames";
import { Spinner } from "@/components/core/spinner";

export type LoadingProps = {
  className?: string;
  iconClass?: string;
  message?: string;
};

export const Loading = ({ className, iconClass, message = "Loading..." }: LoadingProps) => (
  <div className={cx("ctw-space-x-2", className)}>
    {message && <span className="ctw-text-sm ctw-italic">{message}</span>}
    <Spinner className={iconClass} />
  </div>
);
