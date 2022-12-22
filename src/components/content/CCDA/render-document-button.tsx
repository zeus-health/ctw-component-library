import { DocumentButton } from "./document-button";
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { BinaryDocumentData, SourceDocumentMap } from "@/fhir/conditions";

export type RenderDocumentButtonProps = {
  idMap: SourceDocumentMap;
  entry: CollapsibleDataListProps;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRawBinary: React.Dispatch<
    React.SetStateAction<BinaryDocumentData | undefined>
  >;
};

export const RenderDocumentButton = ({
  idMap,
  entry,
  setIsModalOpen,
  setRawBinary,
}: RenderDocumentButtonProps) => (
  <>
    {idMap.get(entry.id) && idMap.get(entry.id)?.isBinary && (
      <DocumentButton
        onClick={() => {
          setIsModalOpen(true);
          setRawBinary(idMap.get(entry.id));
        }}
      />
    )}
  </>
);
