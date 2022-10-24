import { fhirErrorResponse, isFhirError } from "@/fhir/errors";
import { Resource } from "fhir/r4";
import { useState } from "react";
import { Alert } from "./alert";
import { useCTW } from "./ctw-provider";
import { Modal, ModalProps } from "./modal";

export type ModalConfirmDeleteProps = {
  resource: Resource;
  message: string;
  onDelete: () => void;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const ModalConfirmDelete = ({
  resource,
  message,
  onDelete,
  onClose,
  ...modalProps
}: ModalConfirmDeleteProps) => {
  const { getRequestContext } = useCTW();
  const [alert, setAlert] = useState<{ header: string; message: string }>();

  const onConfirm = async () => {
    const { fhirClient } = await getRequestContext();
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
      onClose();
      onDelete();
    } catch (err) {
      if (isFhirError(err)) {
        const response = fhirErrorResponse("Failed to Remove", err);
        setAlert({
          header: `${response.status} ${response.title}`,
          message: response.statusText,
        });
      } else if (err instanceof Error) {
        setAlert({ header: err.name, message: err.message });
      }
    }
  };
  return (
    <Modal
      title={`Remove ${resource.resourceType}`}
      onAfterClosed={() => setAlert(undefined)}
      {...modalProps}
    >
      <div className="ctw-flex ctw-h-full ctw-flex-col ctw-items-center ctw-overflow-y-auto">
        {alert && (
          <Alert header={alert.header} type="error">
            <div className="ctw-max-w-sm ctw-truncate">{alert.message}</div>
          </Alert>
        )}
        <p className="ctw-subtext ctw-max-w-md ctw-text-center">{message}</p>
      </div>
      <div className="ctw-flex ctw-flex-col ctw-items-center ctw-space-y-4">
        <button type="button" onClick={onConfirm} className="ctw-btn-warn">
          Remove {resource.resourceType}
        </button>
        <button type="button" onClick={onClose} className="ctw-btn-clear">
          Cancel
        </button>
      </div>
    </Modal>
  );
};
