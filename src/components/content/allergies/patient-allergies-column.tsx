import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { AllergyModel } from "@/fhir/models/allergies";

export const patientAllergiesColumns = (includeViewFhirResource = true) => {
  const allergyColumns: TableColumn<AllergyModel>[] = [
    {
      title: "Name",
      dataIndex: "display",
    },
    {
      title: "Last Updated",
      dataIndex: "recordedDate",
    },
    {
      title: "Managing Organization",
      dataIndex: "managingOrganization",
    },
    {
      title: "Details",
      render: (allergy) => (
        <div>
          <div className="ctw-font-medium">
            Reaction: {allergy.manifestations}
          </div>
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
