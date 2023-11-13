import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { toast, ToastOptions } from "react-toastify";

export type ToastProps = {
  title?: string;
  body?: string;
  options?: ToastOptions;
  containerId?: string;
  type: "success" | "info" | "error";
};

export const APP_TOAST_CONTAINER_ID = "ctw-toast-container";
export const APP_TOAST_CONTAINER_DRAWER_ID = "ctw-toast-container-drawer";

export const drawerToastStyles = { style: { bottom: "40px" } };

export const notify = ({
  type,
  title,
  body,
  options,
  containerId = APP_TOAST_CONTAINER_ID,
}: ToastProps) => {
  // Do switch statement based on type
  switch (type) {
    case "success":
      notifySuccess({ title, body, options, containerId });
      break;
    case "info":
      notifyInfo({ title, body, options, containerId });
      break;
    case "error":
      notifyError({ title, body, options, containerId });
      break;
    default:
      throw new Error(`Unknown toast type: ${type}`);
  }
};

export const notifyInfo = ({ title, body, options, containerId }: Omit<ToastProps, "type">) =>
  toast.info(
    <div>
      <div className="ctw-font-medium">{title}</div>
      <div className="ctw-font-normal">{body}</div>
    </div>,
    {
      ...options,
      type: "info",
      icon: false,
      containerId,
      className: "ctw-toast-override !ctw-bg-notification-dark",
      style: options?.style,
    }
  );

export const notifyError = ({ title, body, options, containerId }: Omit<ToastProps, "type">) =>
  toast.error(
    <div className="ctw-toast-grid-with-icon ">
      <FontAwesomeIcon icon={faCircleExclamation} className="ctw-h-5 ctw-text-error-main" />
      {title && <div className="ctw-font-medium ctw-text-error-text">{title}</div>}
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
      containerId,
      className: "ctw-toast-override !ctw-bg-error-light",
      style: options?.style,
      closeButton: <FontAwesomeIcon icon={faXmark} className="ctw-h-4 ctw-text-error-text" />,
    }
  );

export const notifySuccess = ({ title, body, options, containerId }: Omit<ToastProps, "type">) =>
  toast.success(
    <div className="ctw-toast-grid-with-icon">
      <FontAwesomeIcon icon={faCircleCheck} className="ctw-h-5 ctw-text-success-main" />
      {title && <div className="ctw-font-medium">{title}</div>}
      <div className={cx(`ctw-font-normal`, { "ctw-toast-grid-with-icon-body-text": title })}>
        {body}
      </div>
    </div>,
    {
      ...options,
      icon: false,
      containerId,
      className: "ctw-toast-override !ctw-bg-notification-dark",
      style: options?.style,
    }
  );
