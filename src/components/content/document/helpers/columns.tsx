import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentsColumns = (includeViewFhirResource = false) => {
  const documentColumns: TableColumn<DocumentModel>[] = [
    {
      title: "Title",
      render: (document) => <div>{document.title}</div>,
    },
    {
      title: "Date Created",
      render: (document) => (
        <div>
          <div>{document.dateCreated} </div>
          <div>{document.custodian}</div>
        </div>
      ),
    },
  ];
  if (includeViewFhirResource) {
    documentColumns.push({
      widthPercent: 20,
      minWidth: 150,
      render: (document: DocumentModel) => (
        <ViewFHIR name="Document Resource" resource={document.resource} />
      ),
    });
  }

  return documentColumns;
};
