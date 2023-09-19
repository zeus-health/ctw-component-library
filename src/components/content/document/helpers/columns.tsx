import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DocumentModel } from "@/fhir/models/document";

export const patientDocumentColumns: TableColumn<DocumentModel>[] = [
  {
    widthPercent: 25,
    minWidth: 200,
    title: "Title",
    render: (document) => <ResourceTitleColumn title={document.title} />,
  },
  {
    widthPercent: 20,
    minWidth: 128,
    title: "Date",
    render: (document) => (
      <div>
        {document.encounterDate && <div>Encounter: {document.encounterDate}</div>}
        {document.dateCreated && <div>Retrieved: {document.dateCreated}</div>}
      </div>
    ),
  },
  {
    widthPercent: 55,
    minWidth: 200,
    title: "Details",
    render: (document) => (
      <div>
        {document.custodian && <div>Author: {document.custodian}</div>}
        {document.sectionDisplays && document.sectionDisplays.length > 1 && (
          <div>{document.sectionDisplays.length} sections</div>
        )}
      </div>
    ),
  },
];
