import { ReactNode, useState } from "react";
import { CcdaViewer } from "../content/CCDA/ccda_viewer";
import { ErrorAlert } from "./alert";
import { Modal, ModalProps } from "./modal";

export type CCDAModalProps = {
  document: Document;
  onClose: () => void;
} & Omit<ModalProps, "title" | "children" | "onAfterClosed">;

export const CCDAModal = ({
  document,
  onClose,
  ...modalProps
}: CCDAModalProps) => {
  return (
    <Modal {...modalProps}>
      <div className="ctw-items-left ctw-flex ctw-h-full ctw-flex-col ctw-space-y-2 ctw-overflow-y-auto">
        hi
      </div>
      {/* <div className="ctw-flex ctw-w-full ctw-space-x-4">
        <CcdaViewer document={document} />
      </div> */}
    </Modal>
  );
};
