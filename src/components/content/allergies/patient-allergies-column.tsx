import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { AllergyModel } from "@/fhir/models/allergies";
import { compact } from "@/utils/nodash";

export const patientAllergiesColumns = (
  cardView = false
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
    cardView
      ? null
      : {
          title: "Status",
          dataIndex: "clinicalStatus",
        },
    {
      title: "Category",
      dataIndex: "categories",
    },
    {
      title: "Onset",
      dataIndex: "onset",
    },
    cardView
      ? null
      : {
          render: (allergy) => (
            <ViewFHIR name="Allergy Resource" resource={allergy.resource} />
          ),
        },
  ]);
