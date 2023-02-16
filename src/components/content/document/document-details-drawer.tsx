import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { DocumentModel } from "@/fhir/models/document";
import { useCCDAModal } from "../CCDA/modal-ccda";

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
          <div className="ctw-text-2xl">{document.status}</div>
        </div>

        <Details data={documentData(document)} />
      </Drawer.Body>
    </Drawer>
  );
}

export const documentData = (document: DocumentModel) => [
  { label: "status", value: document.status },
];
