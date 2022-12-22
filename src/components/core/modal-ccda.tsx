import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Base64BinaryField } from "../content/CCDA/base64toBinaryField";
import { Modal, ModalProps } from "./modal";
import { BinaryDocumentData } from "@/fhir/conditions";

export type CCDAModalProps = {
  rawBinary: BinaryDocumentData;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const CCDAModal = ({
  rawBinary,
  onClose,
  ...modalProps
}: CCDAModalProps) => {
  const [isXMLData, setIsXMLData] = useState(false);

  useEffect(() => {
    if (rawBinary.isBinary) {
      setIsXMLData(true);
    }
  }, [isXMLData, rawBinary.isBinary]);

  return (
    <Modal {...modalProps}>
      {isXMLData && rawBinary.xmlBinary?.data && (
        <div className="ctw-flex ctw-w-full ctw-space-x-4">
          <Base64BinaryField
            record={rawBinary.xmlBinary}
            value={rawBinary.xmlBinary.data}
            contentType={rawBinary.xmlBinary.contentType}
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
};
