import { useEffect, useState } from "react";
import { DocumentButton } from "../CCDA/document-button";
import { useCCDAModal } from "../CCDA/modal-ccda";
import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { Loading } from "@/components/core/loading";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { SimpleMoreList } from "@/components/core/simple-more-list";
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
  const [isLoading, setIsLoading] = useState(true);
  const [binaryId, setBinaryId] = useState<string | undefined>();
  const { getRequestContext } = useCTW();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      if (document.binaryID) {
        setBinaryId(document.binaryID);
      }
      setIsLoading(false);
    }

    void load();
  }, [binaryId, document, getRequestContext]);
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

        {isLoading ? (
          <Loading message="Loading document data..." />
        ) : (
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
        )}
      </Drawer.Body>
    </Drawer>
  );
}

export const documentData = (document: DocumentModel) => [
  { label: "status", value: document.status },
  { label: "docStatus", value: document.docStatus },
  { label: "Managing Organization", value: document.managingOrganization },
  {
    label: "Section Display",
    value: document.SectionDisplays && (
      <SimpleMoreList
        items={document.SectionDisplays}
        limit={30}
        total={document.SectionDisplays.length}
      />
    ),
  },
];
