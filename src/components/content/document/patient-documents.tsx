import cx from "classnames";
import { useRef } from "react";
import { patientDocumentColumns } from "./helpers/columns";
import { useDocumentDetailsDrawer } from "./helpers/details";
import { defaultDocumentsFilters, documentsFilter } from "./helpers/filters";
import { defaultDocumentSort, documentSortOptions } from "./helpers/sorts";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "../../../utils/query-keys";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { useCTW } from "@/components/core/providers/use-ctw";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { getBinaryDocument } from "@/fhir/binaries";
import { usePatientTopLevelDocuments } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useBaseTranslations } from "@/i18n";

export type PatientDocumentsProps = {
  className?: string;
  onAddToRecord?: (document: DocumentModel, binary: fhir4.Binary) => void;
};

function PatientDocumentsComponent({ className, onAddToRecord }: PatientDocumentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const patientDocumentQuery = usePatientTopLevelDocuments();
  const rowActions = useRowActions(onAddToRecord);
  const { viewOptions, allTime } = getDateRangeView<DocumentModel>("dateCreated");
  const { data, setViewOption, setSort, setFilters } = useFilteredSortedData({
    defaultSort: defaultDocumentSort,
    defaultFilters: defaultDocumentsFilters,
    defaultView: allTime,
    records: patientDocumentQuery.data,
  });

  const isEmptyQuery = patientDocumentQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openDetails = useDocumentDetailsDrawer({ rowActions });

  return (
    <AnalyticsProvider componentName="PatientDocuments">
      <div ref={containerRef} className={cx(className, "ctw-scrollable-pass-through-height")}>
        <ResourceTableActions
          filterOptions={{
            onChange: setFilters,
            defaultState: defaultDocumentsFilters,
            filters: documentsFilter(),
          }}
          sortOptions={{
            defaultSort: defaultDocumentSort,
            options: documentSortOptions,
            onChange: setSort,
          }}
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: allTime,
          }}
        />
        <PatientResourceTable
          isLoading={patientDocumentQuery.isLoading}
          data={data}
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="documents"
            />
          }
          columns={patientDocumentColumns}
          onRowClick={openDetails}
          rowActions={rowActions}
          enableDismissAndReadActions
          queryKey={QUERY_KEY_PATIENT_DOCUMENTS}
        />
      </div>
    </AnalyticsProvider>
  );
}

function useRowActions(onAddToRecord?: (document: DocumentModel, binary: fhir4.Binary) => void) {
  const { t } = useBaseTranslations();
  const { trackInteraction } = useAnalytics();
  const { getRequestContext } = useCTW();
  return (record: DocumentModel): RowActionsConfigProp<DocumentModel> => {
    const { binaryId } = record;

    if (!binaryId || !onAddToRecord) {
      return [];
    }

    return [
      {
        className: "ctw-btn-primary ctw-ml-1 ctw-capitalize",
        testId: "add-to-record",
        text: t("resourceTable.add"),
        onClick: async () => {
          const binary = await getBinaryDocument(await getRequestContext(), binaryId);
          onAddToRecord(record, binary);
          trackInteraction("add_to_record");
        },
      },
    ];
  };
}

export const PatientDocuments = withErrorBoundary(PatientDocumentsComponent, "PatientDocuments");
