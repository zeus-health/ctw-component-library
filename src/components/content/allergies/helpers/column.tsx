import { CheckIcon } from "@/components/core/check-icon";
import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";

export const patientAllergiesColumns = (builderId: string, includeViewFhirResource = false) => {
  const allergyColumns: TableColumn<AllergyModel>[] = [
    {
      title: "Name",
      render: (allergy) => (
        <div>
          <div className="ctw-flow-root">
            <span
              className={`ctw-font-${
                allergy.ownedByBuilder(builderId) || allergy.isArchived ? "normal" : "medium"
              }`}
            >
              {capitalize(allergy.display)}
            </span>
            <span className="ctw-float-right">
              {allergy.ownedByBuilder(builderId) ? (
                <CheckIcon />
              ) : (
                <></>
                // <svg
                //   className="ctw-h-3 ctw-w-3 ctw-fill-success-main"
                //   viewBox="0 0 2 2"
                //   aria-hidden="true"
                // >
                //   <circle cx={1} cy={1} r={1} />
                // </svg>
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
          <div className="ctw-font-normal">{allergy.recordedDate} </div>
          <div>{allergy.managingOrganization}</div>
        </div>
      ),
    },
    {
      title: "Details",
      render: (allergy) => (
        <div>
          {!!allergy.manifestations && allergy.manifestations !== "unknown" && (
            <div className="ctw-font-normal">Reaction: {capitalize(allergy.manifestations)}</div>
          )}
        </div>
      ),
    },
  ];
  if (includeViewFhirResource) {
    allergyColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (allergy) => <ViewFHIR name="Allergy Resource" resource={allergy.resource} />,
    });
  }

  return allergyColumns;
};
