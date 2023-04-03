import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";

export const patientAllergiesColumns = (includeViewFhirResource = false) => {
  const allergyColumns: TableColumn<AllergyModel>[] = [
    {
      title: "Name",
      render: (allergy) => (
        <div>
          <div className="ctw-font-medium">{capitalize(allergy.display)} </div>
        </div>
      ),
    },
    {
      title: "Last Updated",
      render: (allergy) => (
        <div>
          <div className="ctw-font-medium">{allergy.recordedDate} </div>
          <div>{allergy.managingOrganization}</div>
        </div>
      ),
    },
    {
      title: "Details",
      render: (allergy) => (
        <div>
          {!!allergy.manifestations && allergy.manifestations !== "unknown" && (
            <div className="ctw-font-medium">
              Reaction: {capitalize(allergy.manifestations)}
            </div>
          )}
        </div>
      ),
    },
  ];
  if (includeViewFhirResource) {
    allergyColumns.push({
      widthPercent: 10,
      minWidth: 200,
      render: (allergy) => (
        <ViewFHIR name="Allergy Resource" resource={allergy.resource} />
      ),
    });
  }

  return allergyColumns;
};
