import cx from "classnames";
import { useMemo, useRef } from "react";
import { patientDocumentColumns } from "./helpers/columns";
import { defaultDocumentsFilters, documentsFilter } from "./helpers/filters";
import { defaultDocumentSort, documentSortOptions } from "./helpers/sorts";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { RowActionsProps } from "@/components/core/table/table";
import { getBinaryDocument } from "@/fhir/binaries";
import { usePatientDocuments } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useBaseTranslations } from "@/i18n";

export type PatientDocumentsProps = {
  className?: string;
  onAddToRecord?: (document: DocumentModel, binary: fhir4.Binary) => void;
};

function PatientDocumentsComponent({ className, onAddToRecord }: PatientDocumentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const patientDocumentQuery = usePatientDocuments();
  const rowActions = useMemo(() => getRowActions({ onAddToRecord }), [onAddToRecord]);
  const { viewOptions, allTime } = getDateRangeView<DocumentModel>("dateCreated");
  const { data, setViewOption, setSort, setFilters } = useFilteredSortedData({
    defaultSort: defaultDocumentSort,
    defaultFilters: defaultDocumentsFilters,
    defaultView: allTime,
    records: patientDocumentQuery.data,
  });

  const isEmptyQuery = patientDocumentQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.title,
    subHeader: (m) => m.encounterDate,
    details: documentData,
    RowActions: rowActions,
    enableDismissAndReadActions: true,
  });

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Documents"
      className={cx(className, "ctw-scrollable-pass-through-height")}
    >
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
      <ResourceTable
        isLoading={patientDocumentQuery.isLoading}
        data={data}
        emptyMessage={
          <EmptyTable hasZeroFilteredRecords={hasZeroFilteredRecords} resourceName="documents" />
        }
        columns={patientDocumentColumns}
        onRowClick={openDetails}
        RowActions={rowActions}
        enableDismissAndReadActions
      />
    </div>
  );
}

type ExtraRowActionProps = {
  onAddToRecord?: (document: DocumentModel, binary: fhir4.Binary) => void;
};

const getRowActions =
  ({ onAddToRecord }: ExtraRowActionProps) =>
  (props: RowActionsProps<DocumentModel>) =>
    <RowActions {...props} onAddToRecord={onAddToRecord} />;

type RowActionsProps2 = RowActionsProps<DocumentModel> & ExtraRowActionProps;

const RowActions = ({ record, onSuccess, onAddToRecord }: RowActionsProps2) => {
  const { t } = useBaseTranslations();
  const { getRequestContext } = useCTW();
  const { binaryId } = record;

  return onAddToRecord && binaryId ? (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-primary ctw-ml-1 ctw-capitalize"
        data-zus-telemetry-click="Add to record"
        data-testid="add-to-record"
        onClick={async () => {
          const binary = await getBinaryDocument(await getRequestContext(), binaryId);
          onAddToRecord(record, binary);
          onSuccess?.();
        }}
      >
        {t("resourceTable.add")}
      </button>
    </div>
  ) : null;
};

export const PatientDocuments = withErrorBoundary(PatientDocumentsComponent, "PatientDocuments");

const documentData = (document: DocumentModel) => [
  { label: "Date Retrieved", value: document.dateCreated },
  { label: "Author", value: document.custodian },
  {
    label: "Section Display",
    value: document.sectionDisplays && (
      <ul className="ctw-m-0 ctw-list-disc ctw-pl-4">
        {document.sectionDisplays.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={item + index}>{item}</li>
        ))}
      </ul>
    ),
  },
];
