import { TableColumn } from "@/components/core/table/table-helpers";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentColumns: TableColumn<DocumentModel>[] = [
  {
    widthPercent: 20,
    minWidth: 100,
    title: "Date Created",
    render: (document) => <div className="group-hover:ctw-underline">{document.dateCreated}</div>,
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
