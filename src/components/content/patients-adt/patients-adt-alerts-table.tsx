import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import cx from "classnames";
import { useEffect, useState } from "react";
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
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useCTW } from "@/components/core/providers/use-ctw";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { enrichWithBasics } from "@/fhir/basic";
import { EncounterModel } from "@/fhir/models/encounter";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { EncounterGraphqlResponse, encountersQuery } from "@/services/fqs/queries/encounters";
import { QUERY_KEY_ENCOUNTERS_RELATED } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

const PAGE_SIZE = 10;

// Cache related encounters and notes for 10 minutes.
const RELATED_ENC_STALE_TIME = 1000 * 60 * 10;

type RelatedEncounterMap = Map<
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
  encounterAndNotesData?: RelatedEncounterMap;
  goToPatient: (upid: string) => void;
} & TableOptionProps<EncounterModel>;

function assignEncountersAndNotes(
  adtEncounters: EncounterModel[],
  encounterAndNotesData: RelatedEncounterMap,
  getRequestContext: () => Promise<CTWRequestContext>
) {
  adtEncounters.forEach(async (e: EncounterModel) => {
    if (!encounterAndNotesData.has(e.resource.id ?? "")) {
      return;
    }
    const encAndNote = encounterAndNotesData.get(e.resource.id ?? "");

    if (encAndNote) {
      const requestContext = await getRequestContext();
      const { data: encounterFqsData } = await queryClient.fetchQuery(
        [QUERY_KEY_ENCOUNTERS_RELATED, e.id],
        async () => {
          const graphClient = createGraphqlClient(requestContext);
          return fqsRequest<EncounterGraphqlResponse>(graphClient, encountersQuery, {
            upid: encAndNote.upid,
            cursor: "",
            first: 1,
            sort: {
              lastUpdated: "DESC",
            },
            filter: {
              ids: {
                anymatch: [encAndNote.cwcq_encounter_id],
              },
            },
          });
        },
        { staleTime: RELATED_ENC_STALE_TIME }
      );

      const encounterNodes = encounterFqsData.EncounterConnection.edges.map((x) => x.node);
      const encounterNode = encounterNodes[0];

      // Reference enc & note
      e.relatedEncounter = new EncounterModel(encounterNode, encounterNode.ProvenanceList);
      e.relatedEncounter.binaryId = encAndNote.binary_id.replaceAll('"', "");
    }
  });
}

function ADTTableComponent({
  className,
  isLoading = false,
  data,
  encounterAndNotesData,
  goToPatient,
}: ADTTableProps) {
  const openADTDetails = useADTAlertDetailsDrawer(goToPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingBasics, setIsLoadingBasics] = useState(true);
  const { getRequestContext } = useCTW();
  const { past7days, past30days, past3months } = getDateRangeView<EncounterModel>("periodStart");

  useEffect(() => {
    void enrichWithBasics(data, getRequestContext).then(() => {
      setIsLoadingBasics(false);
    });
  }, [data, getRequestContext]);

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
    isLoading: isLoadingBasics,
  });

  const viewOptions = [past7days, past30days, past3months];
  const dataFilteredSortedDeduped = dedupeAndMergeEncounters(dataFilteredSorted, "patientsADT");
  const dataOnPage = dataFilteredSortedDeduped.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (encounterAndNotesData) {
    assignEncountersAndNotes(dataOnPage, encounterAndNotesData, getRequestContext);
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
          data={dataOnPage}
          columns={columns}
          isLoading={isLoading || isLoadingBasics}
          emptyMessage={
            <EmptyTableNoneFound
              hasZeroFilteredRecords={dataFilteredSortedDeduped.length === 0}
              resourceName="encounters"
            />
          }
          onRowClick={openADTDetails}
          hidePagination
          enableDismissAndReadActions
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
