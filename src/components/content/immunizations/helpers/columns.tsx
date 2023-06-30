import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { ImmunizationModel } from "@/fhir/models/immunization";
import { capitalize } from "@/utils/nodash";

export const patientImmunizationsColumns = (builderId: string, includeViewFhirResource = false) => {
  const immunizationColumns: TableColumn<ImmunizationModel>[] = [
    {
      title: "Date",
      render: (immunization) => (
        <div>
          <div>{immunization.occurrence} </div>
          <div>{immunization.managingOrganization}</div>
        </div>
      ),
    },
    {
      title: "Immunization",
      minWidth: 400,
      render: (immunization) => (
        <div>
          <div className="ctw-flow-root">
            {capitalize(immunization.description)}{" "}
            {immunization.cvxCode ? `(CVX: ${immunization.cvxCode})` : ""}
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
  ];
  if (includeViewFhirResource) {
    immunizationColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (immunization) => (
        <ViewFHIR name="Immunization Resource" resource={immunization.resource} />
      ),
    });
  }

  return immunizationColumns;
};
