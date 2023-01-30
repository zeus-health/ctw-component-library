import { TableColumn } from "@/components/core/table/table-helpers";
import { AllergyModel } from "@/fhir/models/allergies";

export const patientAllergiesColumns: TableColumn<AllergyModel>[] = [
  {
    title: "Description",
    dataIndex: "display",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Category",
    dataIndex: "categories",
  },
  {
    title: "Onset",
    dataIndex: "onset",
  },
];
