import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { UseQueryResult } from "@tanstack/react-query/build/lib/types";
import cx from "classnames";
import { useADTAlertDetailsDrawer } from "./modal-hooks";
import { defaultEncounterFilters } from "../encounters/helpers/filters";
import { TableOptionProps } from "../patients/patients-table";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

export type ADTTableProps = {
  className?: cx.Argument;
  pageSize?: number;
  query: UseQueryResult<EncounterModel[], unknown>;
} & TableOptionProps<EncounterModel>;

function ADTTableComponent({ className, query }: ADTTableProps) {
  const { isLoading } = query;
  const openADTDetails = useADTAlertDetailsDrawer();

  const { viewOptions, past30days } = getDateRangeView<EncounterModel>("periodStart");
  const { data, setViewOption } = useFilteredSortedData({
    defaultView: past30days,
    defaultFilters: defaultEncounterFilters,
    records: query.data,
  });

  return (
    <AnalyticsProvider componentName="PatientsTable">
      <div className={cx("ctw-scrollable-pass-through-height", className)}>
        <ResourceTableActions
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: past30days,
          }}
        />
        <ResourceTable
          data={data}
          columns={columns}
          isLoading={isLoading}
          emptyMessage={
            <EmptyTable hasZeroFilteredRecords={data.length === 0} resourceName="encounters" />
          }
          onRowClick={openADTDetails}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const ADTAlertsTable = withErrorBoundary(ADTTableComponent, "PatientsTable");

const columns: TableColumn<EncounterModel>[] = [
  {
    title: "Patient",
    render: (e) => e.patient && <PatientColumn patient={e.patient} />,
  },
  {
    title: "Date",
    render: (e) => e.periodStart,
  },
  {
    title: "Status",
    render: (e) => (
      <>
        <div>{e.periodEnd ? "Discharged" : "Active"}</div>
        <div>{e.typeDisplay}</div>
      </>
    ),
  },
  {
    title: "Location",
    render: (e) => e.location,
  },
  {
    title: "Diagnosis",
    render: (e) => (
      <SimpleMoreList items={e.diagnoses ?? []} limit={3} total={e.diagnoses?.length ?? 0} />
    ),
  },
];

type PatientColumnProps = {
  patient: PatientModel;
};

const PatientColumn = ({ patient }: PatientColumnProps) => (
  <div className="ctw-flex ctw-items-center">
    <div className="ctw-ml-4">
      <div className="ctw-flex ctw-font-medium">
        <div className="ctw-max-w-xs">{patient.fullName}</div>
        {patient.gender && <div className="ctw-uppercase"> ({patient.gender[0]})</div>}
      </div>
      <div className="ctw-text-content-lighter">
        {patient.dob} ({patient.age})
      </div>
    </div>
  </div>
);
