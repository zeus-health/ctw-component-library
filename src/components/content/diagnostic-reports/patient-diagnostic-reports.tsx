import cx from "classnames";
import "./diagnostic-reports.scss";
import { patientDiagnosticReportsColumns } from "./helpers/columns";
import { defaultDiagnosticReportFilters, diagnosticReportFilter } from "./helpers/filters";
import { defaultDiagnosticReportSort, diagnosticReportSortOptions } from "./helpers/sorts";
import { QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS } from "../../../utils/query-keys";
import { useObservationsDetailsDrawer } from "../observations/helpers/drawer";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useUserBuilderId } from "@/components/core/providers/user-builder-id";
import { usePatientDiagnosticReportsWithTrendData } from "@/fhir/diagnostic-report";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type PatientDiagnosticReportsProps = {
  className?: string;
};

function PatientDiagnosticReportsComponent({ className }: PatientDiagnosticReportsProps) {
  const query = usePatientDiagnosticReportsWithTrendData();
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
        <PatientResourceTable
          showTableHead
          isLoading={query.isLoading}
          data={data}
          columns={patientDiagnosticReportsColumns(userBuilderId)}
          onRowClick={openDetails}
          enableDismissAndReadActions
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="diagnostics"
            />
          }
          queryKey={QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const PatientDiagnosticReports = withErrorBoundary(
  PatientDiagnosticReportsComponent,
  "PatientDiagnosticReports"
);
