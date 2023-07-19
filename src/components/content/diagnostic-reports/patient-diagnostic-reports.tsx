import cx from "classnames";
import { patientDiagnosticReportsColumns } from "./helpers/columns";
import { defaultDiagnosticReportFilters, diagnosticReportFilter } from "./helpers/filters";
import { defaultDiagnosticReportSort, diagnosticReportSortOptions } from "./helpers/sorts";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { Telemetry } from "@/utils/telemetry";

export type PatientDiagnosticReportsProps = {
  className?: string;
};

function PatientDiagnosticReportsComponent({ className }: PatientDiagnosticReportsProps) {
  const query = usePatientAllDiagnosticReports();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultDiagnosticReportFilters,
    defaultSort: defaultDiagnosticReportSort,
    records: query.data,
  });
  const userBuilderId = useUserBuilderId();
  const isEmptyQuery = query.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const OpenDetails = () => {
    Telemetry.countMetric("click.count.diagnostic_report_component", 1, ["fqs"]);
    return useObservationsDetailsDrawer();
  };

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="DiagnosticReports"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultDiagnosticReportFilters,
          filters: diagnosticReportFilter(),
        }}
        sortOptions={{
          defaultSort: defaultDiagnosticReportSort,
          options: diagnosticReportSortOptions,
          onChange: setSort,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={query.isLoading}
        data={data}
        columns={patientDiagnosticReportsColumns(userBuilderId)}
        onRowClick={OpenDetails}
        enableDismissAndReadActions
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="diagnostics" />
        }
      />
    </div>
  );
}

export const PatientDiagnosticReports = withErrorBoundary(
  PatientDiagnosticReportsComponent,
  "PatientDiagnosticReports"
);
