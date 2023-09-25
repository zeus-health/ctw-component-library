import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import cx from "classnames";
import { useState } from "react";
import { adtFilter, defaultADTFilters } from "./filters";
import { useADTAlertDetailsDrawer } from "./modal-hooks";
import { dedupeAndMergeEncounters } from "../encounters/helpers/filters";
import { defaultEncounterSort, encounterSortOptions } from "../encounters/helpers/sorts";
import { TableOptionProps } from "../patients/patients-table";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTableNoneFound } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

const PAGE_SIZE = 10;

export type ADTTableProps = {
  className?: cx.Argument;
  isLoading?: boolean;
  data: EncounterModel[];
} & TableOptionProps<EncounterModel>;

function ADTTableComponent({ className, isLoading = false, data }: ADTTableProps) {
  const openADTDetails = useADTAlertDetailsDrawer();

  const [currentPage, setCurrentPage] = useState(1);
  const { viewOptions, past30days } = getDateRangeView<EncounterModel>("periodStart");
  const {
    data: data2,
    setViewOption,
    setFilters,
    setSort,
  } = useFilteredSortedData({
    defaultView: past30days,
    defaultFilters: defaultADTFilters,
    defaultSort: defaultEncounterSort,
    records: data,
  });
  const dataFinal = dedupeAndMergeEncounters(data2, "patientsADT");
  const { trackInteraction } = useAnalytics();

  return (
    <div className={cx("ctw-scrollable-pass-through-height", className)}>
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView: past30days,
        }}
        sortOptions={{
          defaultSort: defaultEncounterSort,
          options: encounterSortOptions,
          onChange: setSort,
        }}
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultADTFilters,
          filters: adtFilter(),
        }}
      />
      <ResourceTable
        data={dataFinal.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={
          <EmptyTableNoneFound
            hasZeroFilteredRecords={dataFinal.length === 0}
            resourceName="encounters"
            trackInteraction={trackInteraction}
          />
        }
        onRowClick={(enc) => {
          trackInteraction("view_adt_details");
          openADTDetails(enc);
        }}
        hidePagination
      >
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          total={dataFinal.length}
        />
      </ResourceTable>
    </div>
  );
}

export const ADTAlertsTable = withErrorBoundary(ADTTableComponent, "ADTTable");

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
