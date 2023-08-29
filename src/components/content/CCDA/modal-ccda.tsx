import { XIcon } from "@heroicons/react/outline";
import { BinaryField } from "./binary-field";
import { Modal, ModalProps } from "@/components/core/modal";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useModal } from "@/components/core/providers/modal-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { getBinaryDocument } from "@/fhir/binaries";
import { usePatientContext } from "@/index";

export function useCCDAModal() {
  const { openModal } = useModal();
  const { getRequestContext } = useCTW();

  return async (binaryId: string, title: string) => {
    const requestContext = await getRequestContext();
    const rawBinary = await getBinaryDocument(requestContext, binaryId);

    openModal({
      component: (props) => <CCDAModal fileName={title} rawBinary={rawBinary} {...props} />,
    });
  };
}

export type CCDAModalProps = {
  rawBinary: fhir4.Binary | undefined;
  fileName: string | undefined;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children">;

export const CCDAModal = ({ rawBinary, fileName, onClose, ...modalProps }: CCDAModalProps) => {
  const { trackInteraction } = useAnalytics();
  const { patientID } = usePatientContext();

  return (
    <Modal {...modalProps}>
      {rawBinary?.data && (
        <div className="ctw-flex ctw-w-full ctw-space-x-4">
          <BinaryField
            data={rawBinary.data}
            contentType={rawBinary.contentType}
            fileName={fileName}
          />
          <div className="ctw-ml-3 ctw-flex ctw-h-7 ctw-items-center">
            <button
              type="button"
              aria-label="close"
              onClick={() => {
                onClose();
                trackInteraction("close_ccda_modal", { patientID });
              }}
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
