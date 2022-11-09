import { createOrEditFhirResource } from "@/fhir/action-helper";
import { SYSTEM_CONDITION_VERIFICATION_STATUS } from "@/fhir/system-urls";
import { Resource } from "fhir/r4";
import { useState } from "react";
import { ErrorAlert } from "./alert";
import { useCTW } from "./ctw-provider";
import { Modal, ModalProps } from "./modal";

export type ModalConfirmDeleteProps = {
  resource: Resource;
  resourceName: string;
  onDelete: () => void;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const ModalConfirmDelete = ({
  resource,
  resourceName,
  onDelete,
  onClose,
  ...modalProps
}: ModalConfirmDeleteProps) => {
  const { getRequestContext } = useCTW();
  const [alert, setAlert] = useState<string>();

  const onConfirm = async () => {
    const { fhirClient } = await getRequestContext();
    try {
      if (!resource.id) {
        throw new Error(
          "Tried to delete a resource that hasn't been created yet."
        );
      }
      const fhirCondition: fhir4.Condition = {
        resourceType: "Condition",
        id: resource.id,
        verificationStatus: {
          coding: [
            {
              system: SYSTEM_CONDITION_VERIFICATION_STATUS,
              code: "Entered In Error",
            },
          ],
        },
        subject: { type: "Patient", reference: `Patient/${patientID}` },
      };

      const response = await createOrEditFhirResource(
        fhirCondition,
        fhirClient
      );

      console.log("response", response);

      onDelete();
      onClose();
    } catch (err) {
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
          onClick={onConfirm}
          className="ctw-btn-primary ctw-flex-1"
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};
