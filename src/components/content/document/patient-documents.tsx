import cx from "classnames";
import { useMemo, useRef } from "react";
import { patientDocumentColumns } from "./helpers/columns";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { RowActionsProps } from "@/components/core/table/table";
import { getBinaryDocument } from "@/fhir/binaries";
import { usePatientDocuments } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { useBaseTranslations } from "@/i18n";

export type PatientDocumentsProps = {
  className?: string;
  onAddToRecord?: (document: DocumentModel, binary: fhir4.Binary) => void;
};

function PatientDocumentsComponent({ className, onAddToRecord }: PatientDocumentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { enabled } = useFQSFeatureToggle("documents");

  const patientDocumentQuery = usePatientDocuments();
  const rowActions = useMemo(() => getRowActions({ onAddToRecord }), [onAddToRecord]);
  const { viewOptions, defaultView } = getDateRangeView<DocumentModel>("dateCreated");
  const { data, setViewOption } = useFilteredSortedData({
    defaultView,
    records: patientDocumentQuery.data,
  });

  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.dateCreated} - ${m.title}`,
    details: documentData,
    enableFQS: enabled,
  });

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Documents"
      className={cx(className, "ctw-scrollable-pass-through-height")}
    >
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView,
        }}
      />
      <ResourceTable
        isLoading={patientDocumentQuery.isLoading}
        data={data}
        emptyMessage="There are no documents available."
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

const RowActions = ({ record, onAddToRecord }: RowActionsProps2) => {
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
        }}
      >
        {t("resourceTable.add")}
      </button>
    </div>
  ) : null;
};

export const PatientDocuments = withErrorBoundary(PatientDocumentsComponent, "PatientDocuments");

const documentData = (document: DocumentModel) => [
  { label: "status", value: document.status },
  { label: "docStatus", value: document.docStatus },
  { label: "Managing Organization", value: document.custodian },
  {
    label: "Section Display",
    value: document.sectionDisplays && (
      <div>
        {document.sectionDisplays.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={item + index}>{item}</div>
        ))}
      </div>
    ),
  },
];
