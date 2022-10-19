import { isFhirError } from "@/fhir/errors";
import { ResourceModel } from "@/models/resource";
import { useState } from "react";
import { AlertDialog } from "./alert";
import { useCTW } from "./ctw-provider";
import { Modal, ModalProps } from "./modal";

export type ModalConfirmDeleteProps = {
  resource: ResourceModel;
  message: string;
  onDelete: () => void;
  onClose: () => void;
} & Omit<ModalProps, "title">;

export const ModalConfirmDelete = ({
  resource,
  message,
  onDelete,
  onClose,
  ...modalProps
}: ModalConfirmDeleteProps) => {
  const { getCTWFhirClient } = useCTW();
  const [error, setError] = useState<string>();

  const onConfirm = async () => {
    const fhirClient = await getCTWFhirClient();
    try {
      if (!resource.id) {
        throw new Error(
          "Tried to delete a resource that hasn't been created yet."
        );
      }
      const response = await fhirClient.delete({
        resourceType: resource.resourceType,
        id: resource.id,
      });
      onDelete();
      onClose();
    } catch (err) {
      if (isFhirError(err)) {
        setError("A FHIR error was thrown.");
      } else if (err instanceof Error) setError(err.message);
    }
  };
  return (
    <Modal title={`Remove ${resource.resourceType}`} {...modalProps}>
      <div className="ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto">
        {error && (
          <AlertDialog header="Failed to Remove">
            <div>{error}</div>
            <div>
              Contact your system administrator or customer service for
              assistance.
            </div>
          </AlertDialog>
        )}
        <p className="ctw-subtext ctw-max-w-md ctw-text-center">{message}</p>
      </div>
      <div className="ctw-flex ctw-flex-col ctw-items-center ctw-space-y-4">
        <button type="button" onClick={onConfirm} className="ctw-btn-warn">
          Remove Condition
        </button>
        <button type="button" onClick={onClose} className="ctw-btn-clear">
          Cancel
        </button>
      </div>
    </Modal>
  );
};
