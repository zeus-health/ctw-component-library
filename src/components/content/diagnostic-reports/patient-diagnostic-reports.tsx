import cx from "classnames";
import "./diagnostic-reports.scss";
import { patientDiagnosticReportsColumns } from "./helpers/columns";
import { defaultDiagnosticReportFilters, diagnosticReportFilter } from "./helpers/filters";
import { defaultDiagnosticReportSort, diagnosticReportSortOptions } from "./helpers/sorts";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientAllDiagnosticReports } from "@/fhir/diagnostic-report";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

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

  const openDetails = useObservationsDetailsDrawer();

  return (
    <AnalyticsProvider componentName="PatientDiagnosticReports">
      <div
        className={cx(className, "ctw-scrollable-pass-through-height", "ctw-diagnostic-reports")}
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
          onRowClick={openDetails}
          enableDismissAndReadActions
          emptyMessage={
            <EmptyTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="diagnostics"
            />
          }
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientDiagnosticReports = withErrorBoundary(
  PatientDiagnosticReportsComponent,
  "PatientDiagnosticReports"
);
