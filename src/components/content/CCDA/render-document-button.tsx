import type { BinaryDocument } from "../condition-history/conditions-history";
import { DocumentButton } from "./document-button";
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { Loading } from "@/components/core/loading";
import { SourceDocumentMap } from "@/fhir/conditions";

export type RenderDocumentButtonProps = {
  idMap: SourceDocumentMap;
  entry: CollapsibleDataListProps;
  updateBinaryDocumentState: React.Dispatch<Partial<BinaryDocument>>;
  loadingDocument: boolean;
};

export const RenderDocumentButton = ({
  idMap,
  entry,
  updateBinaryDocumentState,
  loadingDocument,
}: RenderDocumentButtonProps) => {
  if (loadingDocument) {
    return <Loading message="Loading source document..." />;
  }

  return (
    <>
      {idMap.get(entry.id) && idMap.get(entry.id)?.isBinary && (
        <DocumentButton
          onClick={() => {
            updateBinaryDocumentState({
              isModalOpen: true,
              rawBinary: idMap.get(entry.id),
            });
          }}
        />
      )}
    </>
  );
};
