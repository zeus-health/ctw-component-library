import { TableColumn } from "@/components/core/table/table-helpers";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const patientImmunizationsColumns: TableColumn<ImmunizationModel>[] = [
  {
    widthPercent: 30,
    minWidth: 250,
    dataIndex: "occurance",
  },
  {
    widthPercent: 50,
    minWidth: 250,
    dataIndex: "description",
  },
  {
    widthPercent: 20,
    minWidth: 250,
    render: (immunization) =>
      immunization.cvxCode ? <div>CVX: {immunization.cvxCode}</div> : undefined,
  },
];
