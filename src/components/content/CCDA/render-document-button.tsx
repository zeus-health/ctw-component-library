import type { BinaryDocument } from "../condition-history/conditions-history";
import { DocumentButton } from "./document-button";
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { SourceDocumentMap } from "@/fhir/conditions";

export type RenderDocumentButtonProps = {
  idMap: SourceDocumentMap;
  entry: CollapsibleDataListProps;
  updateBinaryDocumentState: React.Dispatch<Partial<BinaryDocument>>;
};

export const RenderDocumentButton = ({
  idMap,
  entry,
  updateBinaryDocumentState,
}: RenderDocumentButtonProps) => (
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
