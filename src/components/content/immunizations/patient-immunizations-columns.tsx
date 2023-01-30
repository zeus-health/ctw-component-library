import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { compact } from "@/utils/nodash";

export const patientImmunizationsColumns = (
  cardView = false
): TableColumn<ImmunizationModel>[] =>
  compact([
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
    cardView
      ? null
      : {
          render: (immunization) => (
            <ViewFHIR
              name="Immunization Resource"
              resource={immunization.resource}
            />
          ),
        },
  ]);
