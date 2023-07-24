import { ResourceTitleColumn } from "../../resource/helpers/resource-title-column";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DiagnosticReportModel } from "@/fhir/models";

export const patientDiagnosticReportsColumns = (
  builderId: string
): TableColumn<DiagnosticReportModel>[] => [
  {
    title: "Diagnostic",
    widthPercent: 40,
    minWidth: 200,
    render: (diagnostic) => (
      <ResourceTitleColumn
        title={diagnostic.displayName}
        ownedByBuilder={diagnostic.ownedByBuilder(builderId)}
      />
    ),
  },
  {
    title: "Date",
    dataIndex: "effectiveStart",
    widthPercent: 20,
    minWidth: 128,
  },
  {
    title: "Details",
    dataIndex: "details",
    widthPercent: 40,
    minWidth: 200,
  },
];
