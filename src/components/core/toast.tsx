import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { toast, ToastOptions } from "react-toastify";

export type ToastProps = {
  title?: string;
  body?: string;
  options?: ToastOptions;
};

export const notifyInfo = ({ title, body, options }: ToastProps) =>
  toast.info(
    <div>
      <div className="ctw-font-medium">{title}</div>
      <div className="ctw-font-normal">{body}</div>
    </div>,
    {
      ...options,
      type: "info",
      icon: false,
      style: { backgroundColor: "#4b5563", ...options?.style },
    }
  );

export const notifyError = ({ title, body, options }: ToastProps) =>
  toast.error(
    <div className="ctw-toast-grid-with-icon ">
      <FontAwesomeIcon icon={faCircleExclamation} className="ctw-h-5" color="#EF4444" />
      <div className="ctw-font-medium ctw-text-error-text">{title}</div>
      <div
        className={cx("ctw-font-normal ctw-text-error-text", {
          "ctw-toast-grid-with-icon-body-text": title,
        })}
      >
        {body}
      </div>
    </div>,
    {
      ...options,
      icon: false,
      style: { backgroundColor: "#FEE2E2", zIndex: 99999999, ...options?.style },
      closeButton: <FontAwesomeIcon icon={faXmark} className="ctw-h-4" color="#991B1B" />,
    }
  );

export const notifySuccess = ({ title, body, options }: ToastProps) =>
  toast.success(
    <div className="ctw-toast-grid-with-icon">
      <FontAwesomeIcon icon={faCircleCheck} className="ctw-h-5" color="#10B981" />
      {title && <div className="ctw-font-medium">{title}</div>}
      <div className={cx(`ctw-font-normal`, { "ctw-toast-grid-with-icon-body-text": title })}>
        {body}
      </div>
    </div>,
    {
      ...options,
      className: "toast-test",
      icon: false,
      style: { backgroundColor: "#4b5563", ...options?.style },
    }
  );
