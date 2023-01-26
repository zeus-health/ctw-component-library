import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
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
    title: "Status",
    dataIndex: "clinicalStatus",
  },
  {
    title: "Category",
    dataIndex: "categories",
  },
  {
    title: "Onset",
    dataIndex: "onset",
  },
  {
    title: "Manifestations",
    dataIndex: "manifestations",
  },
  {
    render: (allergy) => (
      <ViewFHIR name="Allergy Resource" resource={allergy.resource} />
    ),
  },
];
