import cx from "classnames";
import { useMemo } from "react";
import { patientDocumentsColumns } from "./helpers/columns";
import { useToggleRead } from "../hooks/use-toggle-read";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientDocuments } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { useBaseTranslations } from "@/i18n";
import { QUERY_KEY_BASIC, QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";

export type PatientDocumentsProps = {
  className?: string;
};

function PatientDocumentsComponent({ className }: PatientDocumentsProps) {
  const { featureFlags, builderId } = useCTW();
  const { enabled } = useFQSFeatureToggle("documents");
  const patientDocumentsQuery = usePatientDocuments();
  const { viewOptions, defaultView } = getDateRangeView<DocumentModel>("dateCreated");
  const { data, setViewOption } = useFilteredSortedData({
    defaultView,
    records: patientDocumentsQuery.data,
  });

  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.dateCreated} - ${m.title}`,
    details: documentData,
    enableFQS: enabled,
  });

  const rowActions = useMemo(() => getRowActions(builderId), [builderId]);

  const { toggleRead } = useToggleRead(QUERY_KEY_PATIENT_DOCUMENTS, QUERY_KEY_BASIC);

  const handleRowClick = (record: DocumentModel) => {
    if (!record.isRead) {
      toggleRead(record);
    }
    openDetails(record);
  };

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      data-zus-telemetry-namespace="Documents"
    >
      <ResourceTableActions
        viewOptions={{
          onChange: setViewOption,
          options: viewOptions,
          defaultView,
        }}
      />
      <ResourceTable
        showTableHead
        isLoading={patientDocumentsQuery.isLoading}
        data={data}
        columns={patientDocumentsColumns(featureFlags?.enableViewFhirButton)}
        onRowClick={handleRowClick}
        rowActions={rowActions}
        boldUnreadRows
      />
    </div>
  );
}

export const PatientDocuments = withErrorBoundary(PatientDocumentsComponent, "PatientDocuments");

const documentData = (document: DocumentModel) => [
  { label: "Custodian", value: document.custodian },
  {
    label: "Sections",
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

const getRowActions =
  (userBuilderId: string) =>
  ({ record }: RowActionsProps<DocumentModel>) => {
    const { t } = useBaseTranslations();
    const { isLoading, toggleRead } = useToggleRead(QUERY_KEY_PATIENT_DOCUMENTS, QUERY_KEY_BASIC);

    const readLabel = record.isRead ? t("resourceTable.unread") : t("resourceTable.read");

    return record.ownedByBuilder(userBuilderId) ? (
      <></>
    ) : (
      <div className="ctw-flex ctw-space-x-2">
        <button
          type="button"
          className="ctw-btn-default"
          disabled={isLoading}
          onClick={() => {
            toggleRead(record);
          }}
        >
          {isLoading ? (
            <div className="ctw-flex">
              <Spinner className="ctw-mx-4 ctw-align-middle" />
            </div>
          ) : (
            readLabel
          )}
        </button>
      </div>
    );
  };
