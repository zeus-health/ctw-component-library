import { ExclamationIcon, XCircleIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ReactNode } from "react";

export type AlertType = "caution" | "error";

export type AlertProps = {
  header: string;
  children?: ReactNode;
  className?: string;
};

export const ErrorAlert = ({ header, children, className }: AlertProps) => (
  <div className={cx("ctw-alert-bg ctw-bg-error-bg", className)}>
    <ExclamationIcon className="ctw-h-5 ctw-text-error-icon" />
    <div className="ctw-space-y-2">
      <div className="ctw-text-error-heading">{header}</div>
      {children && <div className="ctw-text-error-message">{children}</div>}
    </div>
  </div>
);

export const CautionAlert = ({ header, children, className }: AlertProps) => (
  <div className={cx("ctw-alert-bg ctw-bg-caution-bg", className)}>
    <XCircleIcon className="ctw-h-5 ctw-text-caution-icon" />
    <div className="ctw-space-y-2">
      <div className="ctw-text-caution-heading">{header}</div>
      {children && <div className="ctw-text-caution-message">{children}</div>}
    </div>
  </div>
);
