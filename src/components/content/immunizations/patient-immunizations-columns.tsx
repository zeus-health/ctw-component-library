import { TableColumn } from "@/components/core/table/table-helpers";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const patientImmunizationsColumns: TableColumn<ImmunizationModel>[] = [
  {
    title: "Date",
    dataIndex: "occurrence",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "CVX Code",
    dataIndex: "cvxCode",
  },
];
