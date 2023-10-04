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
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { encounterADTQuery, EncounterGraphqlResponse } from "@/services/fqs/queries/encounters";

const PAGE_SIZE = 10;

type AdtTemplate = Map<
  string,
  {
    upid: string;
    cwcq_encounter_id: string;
    binary_id: string;
  }
>;

export type ADTTableProps = {
  className?: cx.Argument;
  isLoading?: boolean;
  data: EncounterModel[];
  encounterAndNotesData?: AdtTemplate;
} & TableOptionProps<EncounterModel>;

function ADTTableComponent({
  className,
  isLoading = false,
  data,
  encounterAndNotesData,
}: ADTTableProps) {
  const openADTDetails = useADTAlertDetailsDrawer();
  const [currentPage, setCurrentPage] = useState(1);
  const { viewOptions, past30days } = getDateRangeView<EncounterModel>("periodStart");
  const { getRequestContext } = useCTW();
  const {
    data: dataFilteredSorted,
    setViewOption,
    setFilters,
    setSort,
  } = useFilteredSortedData({
    defaultView: past30days,
    defaultFilters: defaultADTFilters,
    defaultSort: defaultEncounterSort,
    records: data,
  });

  const dataFilteredSortedDeduped = dedupeAndMergeEncounters(dataFilteredSorted, "patientsADT");

  if (encounterAndNotesData) {
    dataFilteredSortedDeduped.forEach(async (e: EncounterModel) => {
      const requestContext = await getRequestContext();
      if (!encounterAndNotesData.has(e.resource.id ?? "")) {
        return;
      }
      const encAndNote = encounterAndNotesData.get(e.resource.id ?? "");
      if (encAndNote) {
        const graphClient = createGraphqlClient(requestContext);

        const { data: encounterFqsData } = await fqsRequest<EncounterGraphqlResponse>(
          graphClient,
          encounterADTQuery,
          {
            upid: encAndNote.upid,
            filter: {
              ids: {
                anymatch: [encAndNote.cwcq_encounter_id],
              },
            },
          }
        );
        const encounterNodes = encounterFqsData.EncounterConnection.edges.map((x) => x.node);
        const encounterNode = encounterNodes[0];
        e.relatedEncounter = new EncounterModel(encounterNode, encounterNode.ProvenanceList);

        e.relatedEncounter.binaryId = encAndNote.binary_id.replaceAll('"', "");
      }
    });
  }

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
          data={dataFilteredSortedDeduped.slice(
            (currentPage - 1) * PAGE_SIZE,
            currentPage * PAGE_SIZE
          )}
          columns={columns}
          isLoading={isLoading}
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
