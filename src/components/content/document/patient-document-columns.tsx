import { TableColumn } from "@/components/core/table/table-helpers";
import { DocumentModel } from "@/fhir/models/document";

export const patientImmunizationsColumns: TableColumn<DocumentModel>[] = [
  {
    title: "Status",
    dataIndex: "status",
  },
];
