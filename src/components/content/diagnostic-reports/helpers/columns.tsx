import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableColumn } from "@/components/core/table/table-helpers";
import { DiagnosticReportModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

export const patientDiagnosticReportsColumns = (
  builderId: string
): TableColumn<DiagnosticReportModel>[] => [
  {
    title: "Diagnostic",
    widthPercent: 40,
    minWidth: 200,
    render: (diagnosticReport) => (
      <div className="group-hover:ctw-underline">
        <div className="ctw-flow-root">
          {capitalize(diagnosticReport.displayName)}
          <span className="ctw-float-right">
            {diagnosticReport.ownedByBuilder(builderId) ? (
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
    title: "Date",
    dataIndex: "effectiveStart",
    widthPercent: 20,
    minWidth: 128,
  },
  {
    title: "Details",
    dataIndex: "performer",
    widthPercent: 40,
    minWidth: 200,
  },
];
