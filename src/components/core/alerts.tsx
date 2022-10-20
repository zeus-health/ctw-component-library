import { ExclamationIcon, XCircleIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ReactNode } from "react";

export type AlertProps = {
  header: string;
  children: ReactNode;
  className?: string;
};

export const CautionAlert = ({ header, children, className }: AlertProps) =>
  Alert({
    icon: <ExclamationIcon className="ctw-w-5 ctw-text-caution-icon" />,
    className: cx("ctw-bg-caution-bg", className),
    header: (
      <div className="ctw-font-medium ctw-text-caution-heading">{header}</div>
    ),
    message: <div className="ctw-text-caution-message">{children}</div>,
  });

export const ErrorAlert = ({ header, children, className }: AlertProps) =>
  Alert({
    icon: <XCircleIcon className="ctw-text-error-icon ctw-w-5" />,
    className: cx("ctw-bg-error-bg", className),
    header: (
      <div className="ctw-text-error-heading ctw-font-medium">{header}</div>
    ),
    message: <div className="ctw-text-error-message">{children}</div>,
  });

type BaseAlertProps = {
  icon: JSX.Element;
  className: string;
  header: JSX.Element;
  message: JSX.Element;
};

const Alert = ({ icon, className, header, message }: BaseAlertProps) => (
  <div
    className={cx(
      "ctw-flex ctw-items-start ctw-space-x-3 ctw-rounded ctw-p-4",
      className
    )}
  >
    {icon}
    <div className="ctw-space-y-2 ctw-text-left">
      {header}
      {message}
    </div>
  </div>
);
