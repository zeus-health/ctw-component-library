import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { capitalize } from "@/utils/nodash";

export const patientImmunizationsColumns = (builderId: string) => {
  const immunizationColumns: TableColumn<ImmunizationModel>[] = [
    {
      title: "Immunization",
      widthPercent: 60,
      minWidth: 320,
      render: (immunization) => (
        <div>
          <div className="ctw-flow-root">
            {capitalize(immunization.description)}
            <span className="ctw-float-right">
              {immunization.ownedByBuilder(builderId) ? (
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
