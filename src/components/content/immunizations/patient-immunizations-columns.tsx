import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const patientImmunizationsColumns: TableColumn<ImmunizationModel>[] = [
  {
    widthPercent: 30,
    minWidth: 250,
    dataIndex: "occurance",
  },
  {
    widthPercent: 40,
    minWidth: 250,
    dataIndex: "description",
  },
  {
    widthPercent: 20,
    minWidth: 250,
    render: (immunization) =>
      immunization.cvxCode && <div>CVX: {immunization.cvxCode}</div>,
  },
  {
    widthPercent: 10,
    minWidth: 200,
    render: (immunization) => (
      <ViewFHIR name="Immunization Resource" resource={immunization.resource} />
    ),
  },
];
