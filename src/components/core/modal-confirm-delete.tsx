import { Resource } from "fhir/r4";
import { useState } from "react";
import { ErrorAlert } from "./alert";
import { Modal, ModalProps } from "./modal";
import { Spinner } from "./spinner";

export type ModalConfirmDeleteProps = {
  resource: Resource;
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
  const [deleting, setDeleting] = useState(false);

  const onConfirm = async () => {
    try {
      setDeleting(true);
      await onDelete();
      setDeleting(false);
      onClose();
    } catch (err) {
      setDeleting(false);
      setAlert(`Something went wrong. Please try again.`);
      throw err;
    }
  };

  return (
    <Modal onAfterClosed={() => setAlert(undefined)} {...modalProps}>
      {alert && <ErrorAlert header={alert} />}
      <div className="ctw-items-left ctw-flex ctw-h-full ctw-flex-col ctw-space-y-2 ctw-overflow-y-auto">
        <span className="ctw-text-left ctw-text-lg ctw-font-medium ctw-text-content-black">
          {`Remove this ${resource.resourceType.toLowerCase()}?`}
        </span>
        <span className="ctw-subtext ctw-max-w-sm ctw-text-left ctw-text-content-light">
          This will remove{" "}
          <span className="ctw-font-medium">{resourceName}</span> from this
          patient&apos;s condition list.
        </span>
      </div>
      <div className="ctw-flex ctw-w-full ctw-space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="ctw-btn-default ctw-flex-1"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={deleting}
          onClick={onConfirm}
          className="ctw-btn-primary ctw-save-button ctw-flex-1"
        >
          {deleting ? "Removing..." : "Remove"}
          {deleting && <Spinner className="ctw-ml-2 ctw-text-white" />}
        </button>
      </div>
    </Modal>
  );
};
