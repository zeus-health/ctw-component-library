import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ImmunizationModel } from "@/fhir/models/immunization";

export const patientImmunizationsColumns = (builderId: string) => {
  const immunizationColumns: TableColumn<ImmunizationModel>[] = [
    {
      title: "Immunization",
      widthPercent: 60,
      minWidth: 320,
      render: (immunization) => (
        <ResourceTitleColumn
          title={immunization.description}
          ownedByBuilder={immunization.ownedByBuilder(builderId)}
        />
      ),
    },
    {
      title: "Date Given",
      render: (immunization) => (
        <div>
          <div>{immunization.occurrence} </div>
          <div>{immunization.managingOrganization}</div>
        </div>
      ),
    },
  ];

  return immunizationColumns;
};
