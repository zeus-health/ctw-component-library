import cx from "classnames";
import { useRef } from "react";
import { patientDocumentColumns } from "./helpers/columns";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";

export type PatientDocumentProps = {
  className?: string;
};

function PatientDocumentsComponent({ className }: PatientDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { featureFlags } = useCTW();
  const { enabled } = useFQSFeatureToggle("documents");

  const patientDocumentQuery = usePatientDocument();
  const { viewOptions, defaultView } = getDateRangeView<DocumentModel>("dateCreated");
  const { data, setViewOption } = useFilteredSortedData({
    defaultView,
    records: patientDocumentQuery.data,
  });

  const isEmptyQuery = patientDocumentQuery.data?.length === 0;
  const isEmptyFilter = data.length === 0;

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
        emptyMessage={
          <EmptyTable
            isEmptyQuery={isEmptyQuery}
            isEmptyFilters={isEmptyFilter}
            resourceName="documents"
          />
        }
        columns={patientDocumentColumns(featureFlags?.enableViewFhirButton)}
        onRowClick={openDetails}
      />
    </div>
  );
}

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
