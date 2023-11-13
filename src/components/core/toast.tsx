import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { toast } from "react-toastify";

export const notifyInfo = ({ title, body }: { title?: string; body?: string }) =>
  toast.info(
    <div>
      <div className="ctw-font-medium">{title}</div>
      <div className="ctw-font-normal">{body}</div>
    </div>,
    { className: "toast-test", type: "info", icon: false, style: { backgroundColor: "#FEE2E2" } }
  );

export const notifyError = ({ title, body }: { title?: string; body?: string }) =>
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
    { className: "toast-test", icon: false, style: { backgroundColor: "#FEE2E2" } }
  );

export const notifySuccess = ({ title, body }: { title?: string; body?: string }) =>
  toast.success(
    <div className="ctw-toast-grid-with-icon">
      <FontAwesomeIcon icon={faCircleCheck} className="ctw-h-5" color="#10B981" />
      {title && <div className="ctw-font-medium">{title}</div>}
      <div className={cx(`ctw-font-normal`, { "ctw-toast-grid-with-icon-body-text": title })}>
        {body}
      </div>
    </div>,
    { className: "toast-test", icon: false, style: { backgroundColor: "#4b5563" } }
  );
