import { isFhirError } from "@/fhir/errors";
import { ResourceModel } from "@/models/resource";
import { queryClient } from "@/utils/request";
import { useState } from "react";
import { AlertDialog } from "../core/alert";
import { useCTW } from "../core/ctw-provider";
import { Modal, ModalProps } from "../core/modal";

export type ModalConfirmDeleteProps = {
  resource: ResourceModel;
  message: string;
} & Pick<ModalProps, "onClose" | "isOpen">;

export const ModalConfirmDelete = ({
  resource,
  message,
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
        resourceType: "Condition",
        id: resource.id,
      });
      queryClient.invalidateQueries(["conditions"]);
      modalProps.onClose();
    } catch (err) {
      if (isFhirError(err)) {
        setError("A FHIR error was thrown.");
      } else if (err instanceof Error) setError(err.message);
    }
  };
  return (
    <Modal title={`Remove ${resource.resourceType}`} {...modalProps}>
      <Modal.Body>
        {error && (
          <AlertDialog header="Failed to Remove">
            <div>{error}</div>
            <div>
              Contact your system administrator or customer service for
              assistance.
            </div>
          </AlertDialog>
        )}
        <p className="ctw-max-w-xl ctw-text-center">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onConfirm} className="ctw-btn-warn">
          Remove Condition
        </button>
        <button
          type="button"
          onClick={modalProps.onClose}
          className="ctw-btn-default"
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};
