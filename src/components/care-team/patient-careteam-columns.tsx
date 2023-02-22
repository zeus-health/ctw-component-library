import { TableColumn } from "@/components/core/table/table-helpers";
import { CareTeamModel } from "@/fhir/models/careteam";

export const patientCareTeamColumns: TableColumn<CareTeamModel>[] = [
  {
    title: "Status",
    dataIndex: "status",
  },
];
