import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";

export const patientAllergiesColumns = (builderId: string) => {
  const allergyColumns: TableColumn<AllergyModel>[] = [
    {
      title: "Name",
      render: (allergy) => (
        <div>
          <div className="ctw-flow-root">
            {capitalize(allergy.display)}
            <span className="ctw-float-right">
              {allergy.ownedByBuilder(builderId) ? (
                <FontAwesomeIcon className="ctw-text-content-light" icon={faCircleCheck} />
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>
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
