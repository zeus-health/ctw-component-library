import { isEmptyClinicalNote, isSectionDocument } from "./filters";
import { Notes } from "../../resource/helpers/notes";
import { useResourceDetailsDrawer } from "../../resource/resource-details-drawer";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { usePatientDocuments } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models";
import { sortBy } from "@/utils/nodash";

export const DocumentNotes = (document: DocumentModel) => {
  const allDocuments = usePatientDocuments();
  // If we're showing the detail drawer for a section document, we only want to show content from that document
  // Otherwise show content from all clinical notes
  const clinicalNotes = isSectionDocument(document)
    ? [document]
    : sortBy(
        allDocuments.data.filter(
          (d) => d.binaryId === document.binaryId && !isEmptyClinicalNote(d) && isSectionDocument(d)
        ),
        "title"
      );

  return <Notes entries={clinicalNotes} documentIdToStartOpen={document.id} />;
};

export const useDocumentDetailsDrawer = ({
  rowActions,
}: {
  rowActions?: (c: DocumentModel) => RowActionsConfigProp<DocumentModel>;
}) =>
  useResourceDetailsDrawer({
    isOpen: true,
    header: (m) => m.title,
    details: documentData,
    rowActions,
    enableDismissAndReadActions: true,
    renderChild: DocumentNotes,
  });

const documentData = (document: DocumentModel) => [
  { label: "Encounter Date", value: document.encounterDate },
  { label: "Date Retrieved", value: document.dateCreated },
  { label: "Author", value: document.custodian },
];
