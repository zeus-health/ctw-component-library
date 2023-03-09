import { TableColumn } from "@/components/core/table/table-helpers";
import { AllergyModel } from "@/fhir/models/allergies";

export const patientAllergiesColumns: TableColumn<AllergyModel>[] = [
  {
    title: "Onset",
    render: (allergy) => (
      <div className="group-hover:ctw-underline">{allergy.onset}</div>
    ),
  },
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
    title: "Manifestations",
    dataIndex: "manifestations",
  },
];
