import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ErrorAlert } from "./alert";
import { Modal, ModalProps } from "./modal";
import { Spinner } from "./spinner";
import { Telemetry } from "@/utils/telemetry";

export type ModalConfirmDeleteProps = {
  resource: string;
  resourceName: string;
  onDelete: () => Promise<void>;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const ModalConfirmDelete = ({
  resource,
  resourceName,
  onDelete,
  onClose,
  ...modalProps
}: ModalConfirmDeleteProps) => {
  const [alert, setAlert] = useState<string>();
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const onConfirm = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      setIsDeleting(false);
      onClose();
    } catch (err) {
      Telemetry.logError(err as Error);
      setIsDeleting(false);
      setAlert(`Something went wrong. Please try again.`);
      throw err;
    }
  };

  return (
    <Modal onAfterClosed={() => setAlert(undefined)} {...modalProps}>
      {alert && <ErrorAlert header={alert} />}
      <div
        className="ctw-items-left ctw-flex ctw-h-full ctw-flex-col ctw-space-y-2 ctw-overflow-y-auto"
        data-zus-telemetry-namespace="ModalConfirmDelete"
      >
        <span className="ctw-text-left ctw-text-lg ctw-font-medium ctw-text-content-black">
          {t("resource.remove.heading", { resource })}
        </span>
        <span className="ctw-subtext ctw-max-w-sm ctw-text-left ctw-text-content-light">
          <Trans i18nKey="resource.remove.body">
            This will remove <span className="ctw-font-medium">{{ resourceName }}</span> from this
            patient&apos;s {{ resource }} list.
          </Trans>
        </span>
      </div>
      <div className="ctw-flex ctw-w-full ctw-space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="ctw-btn-default ctw-flex-1"
          data-zus-telemetry-click="Cancel button"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onConfirm}
          className="ctw-btn-primary ctw-save-button ctw-flex-1"
          data-zus-telemetry-click="Remove button"
        >
          {isDeleting ? "Removing..." : "Remove"}
          {isDeleting && <Spinner className="ctw-ml-2 ctw-text-white" />}
        </button>
      </div>
    </Modal>
  );
};
