import { TableColumn } from "@/components/core/table/table-helpers";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const patientImmunizationsColumns: TableColumn<ImmunizationModel>[] = [
  {
    title: "Date",
    render: (immunization) => (
      <div className="group-hover:ctw-underline">{immunization.occurrence}</div>
    ),
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
