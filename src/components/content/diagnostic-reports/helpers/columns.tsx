import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        capitalizeTitle={false}
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
    widthPercent: 1,
    minWidth: 32,
    className: "ctw-trend-indicator-cell",
    render: (diagnostic) =>
      diagnostic.hasTrends ? <FontAwesomeIcon icon={faArrowTrendUp} /> : null,
  },
  {
    title: "Details",
    dataIndex: "details",
    widthPercent: 39,
    minWidth: 200,
    className: "ctw-details-cell",
  },
];
