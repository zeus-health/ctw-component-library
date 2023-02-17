import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentColumns = (includeViewFhirResource = true) => {
  const documentColumns: TableColumn<DocumentModel>[] = [
    {
      widthPercent: 90,
      minWidth: 150,
      render: (document) => <div>{document.status}</div>,
    },
  ];
  if (includeViewFhirResource) {
    documentColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (document: DocumentModel) => (
        <ViewFHIR name="Document Resource" resource={document.resource} />
      ),
    });
  }

  return documentColumns;
};
