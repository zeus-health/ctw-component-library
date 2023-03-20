import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentColumns = (includeViewFhirResource = false) => {
  const documentColumns: TableColumn<DocumentModel>[] = [
    {
      widthPercent: 20,
      minWidth: 100,
      title: "Date Created",
      render: (document) => (
        <div className="group-hover:ctw-underline">{document.dateCreated}</div>
      ),
    },
    {
      widthPercent: 30,
      minWidth: 200,
      title: "Title",
      render: (document) => <div>{document.title}</div>,
    },
    {
      widthPercent: 30,
      minWidth: 200,
      title: "Managing Organization",
      render: (document) => <div>{document.custodian}</div>,
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
