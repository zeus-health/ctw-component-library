import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";

export const patientAllergiesColumns = (builderId: string) => {
  const allergyColumns: TableColumn<AllergyModel>[] = [
    {
      title: "Name",
      render: (allergy) => (
        <ResourceTitleColumn
          title={allergy.display}
          ownedByBuilder={allergy.ownedByBuilder(builderId)}
        />
      ),
    },
    {
      title: "Last Updated",
      render: (allergy) => (
        <div>
          <div>{allergy.recordedDate}</div>
          <div>{allergy.managingOrganization}</div>
        </div>
      ),
    },
    {
      title: "Details",
      render: (allergy) => (
        <div>
          {!!allergy.manifestations && allergy.manifestations !== "unknown" && (
            <div>Reaction: {capitalize(allergy.manifestations)}</div>
          )}
        </div>
      ),
    },
  ];

  return allergyColumns;
};
