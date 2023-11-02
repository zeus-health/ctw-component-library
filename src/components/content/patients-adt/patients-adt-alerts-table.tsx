import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useEffect, useState } from "react";
import { adtFilter, defaultADTFilters } from "./helpers/filters";
import { useADTAlertDetailsDrawer } from "./helpers/modal-hooks";
import { mapEncountersAndNotes, RelatedEncounterMap } from "./helpers/related-encounters";
import { dedupeAndMergeEncounters } from "../encounters/helpers/filters";
import { defaultEncounterSort, encounterSortOptions } from "../encounters/helpers/sorts";
import { TableOptionProps } from "../patients/patients-table-fqs";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTableNoneFound } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

const PAGE_SIZE = 10;

export type ADTTableProps = {
  className?: cx.Argument;
  isLoading?: boolean;
  data: EncounterModel[];
  encounterAndNotesData?: RelatedEncounterMap;
  goToPatient: (upid: string) => void;
} & TableOptionProps<EncounterModel>;

function ADTTableComponent({
  className,
  isLoading = false,
  data,
  encounterAndNotesData,
  goToPatient,
}: ADTTableProps) {
  const openADTDetails = useADTAlertDetailsDrawer(goToPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataEnriched, setDataEnriched] = useState<EncounterModel[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const { getRequestContext } = useCTW();
  const { past7days, past30days } = getDateRangeView<EncounterModel>("periodStart");

  useEffect(() => {
    if (encounterAndNotesData) {
      void mapEncountersAndNotes(data, encounterAndNotesData, getRequestContext).then(
        (newEncounters) => {
          setDataEnriched(newEncounters);
          setIsLoadingDetails(false);
        }
      );
    }
  }, [data, encounterAndNotesData, getRequestContext]);

  const {
    data: dataFilteredSorted,
    setViewOption,
    setFilters,
    setSort,
  } = useFilteredSortedData({
    defaultView: past30days,
    defaultFilters: defaultADTFilters,
    defaultSort: defaultEncounterSort,
    records: dataEnriched,
  });

  const viewOptions = [past7days, past30days];
  const dataFilteredSortedDeduped = dedupeAndMergeEncounters(dataFilteredSorted, "patientsADT");
  const dataOnPage = dataFilteredSortedDeduped.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <AnalyticsProvider componentName="ADTTable">
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
          data={dataOnPage}
          columns={columns}
          isLoading={isLoading || isLoadingDetails}
          emptyMessage={
            <EmptyTableNoneFound
              hasZeroFilteredRecords={dataFilteredSortedDeduped.length === 0}
              resourceName="encounters"
            />
          }
          onRowClick={openADTDetails}
          hidePagination
        >
          <Pagination
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            setCurrentPage={setCurrentPage}
            total={dataFilteredSortedDeduped.length}
          />
        </ResourceTable>
      </div>
    </AnalyticsProvider>
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
    render: (e) =>
      e.relatedEncounter?.binaryId ? (
        <FontAwesomeIcon icon={faFileLines} className="ctw-h-4 ctw-w-4 ctw-text-content-lighter" />
      ) : undefined,
    widthPercent: 3,
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
