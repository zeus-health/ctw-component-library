import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentColumns: TableColumn<DocumentModel>[] = [
  {
    widthPercent: 35,
    minWidth: 200,
    title: "Title",
    render: (document) => <ResourceTitleColumn title={document.title} />,
  },
  {
    widthPercent: 15,
    minWidth: 128,
    title: "Encounter Date",
    dataIndex: "encounterDate",
  },
  {
    widthPercent: 15,
    minWidth: 128,
    title: "Date Retrieved",
    dataIndex: "dateCreated",
  },
  {
    widthPercent: 35,
    minWidth: 200,
    title: "Author",
    render: (document) => <div>{document.custodian}</div>,
  },
];
