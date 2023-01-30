import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { AllergyModel } from "@/fhir/models/allergies";
import { compact } from "@/utils/nodash";

export const patientAllergiesColumns = (
  isStackedView = false
): TableColumn<AllergyModel>[] =>
  compact([
    {
      title: "Description",
      dataIndex: "display",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "categories",
    },
    {
      title: "Onset",
      dataIndex: "onset",
    },
    isStackedView
      ? null
      : {
          render: (allergy) => (
            <ViewFHIR name="Allergy Resource" resource={allergy.resource} />
          ),
        },
  ]);
