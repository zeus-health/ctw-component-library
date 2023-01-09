import { XIcon } from "@heroicons/react/outline";
import { Base64BinaryField } from "../content/CCDA/base64toBinaryField";
import { Modal, ModalProps } from "./modal";

export type CCDAModalProps = {
  rawBinary: fhir4.Binary | undefined;
  fileName: string | undefined;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children">;

export const CCDAModal = ({
  rawBinary,
  fileName,
  onClose,
  ...modalProps
}: CCDAModalProps) => (
  <Modal {...modalProps}>
    {rawBinary?.data && (
      <div className="ctw-flex ctw-w-full ctw-space-x-4">
        <Base64BinaryField
          data={rawBinary.data}
          contentType={rawBinary.contentType}
          fileName={fileName}
        />
        <div className="ctw-ml-3 ctw-flex ctw-h-7 ctw-items-center">
          <button
            type="button"
            aria-label="close"
            onClick={onClose}
            className="ctw-btn-clear"
          >
            <span className="ctw-sr-only">Close panel</span>
            <XIcon className="ctw-h-6 ctw-w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    )}
  </Modal>
);
