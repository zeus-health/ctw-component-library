import { useEffect, useState } from "react";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { DocumentModel } from "@/fhir/models/document";

export function useDocumentDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (document: DocumentModel) => {
    openDrawer({
      component: (props) => (
        <DocumentDetailsDrawer document={document} {...props} />
      ),
    });
  };
}

export type DocumentDetailsDrawerProps = {
  className?: string;
  document: DocumentModel;
  isOpen: boolean;
  onClose: () => void;
};

export function DocumentDetailsDrawer({
  document,
  className,
  isOpen,
  onClose,
}: DocumentDetailsDrawerProps) {
  const openCCDAModal = useCCDAModal();
  const [binaryId, setBinaryId] = useState<string | undefined>();

  useEffect(() => {
    setBinaryId(document.binaryID);
  }, [binaryId, document]);
  return (
    <Drawer
      className={className}
      title="Document Details"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">
            {document.dateCreated} - {document.title}
          </div>
        </div>

        <Details
          data={documentData(document)}
          documentButton={
            binaryId ? (
              <DocumentButton
                onClick={() => openCCDAModal(binaryId, "Document")}
                text="Source Document"
              />
            ) : undefined
          }
        />
      </Drawer.Body>
    </Drawer>
  );
}

export const documentData = (document: DocumentModel) => [
  { label: "status", value: document.status },
  { label: "docStatus", value: document.docStatus },
  { label: "Managing Organization", value: document.custodian },
  {
    label: "Section Display",
    value: document.sectionDisplays && (
      <div>
        {document.sectionDisplays.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={item + index}>{item}</div>
        ))}
      </div>
    ),
  },
];
