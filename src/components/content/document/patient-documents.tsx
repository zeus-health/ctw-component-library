import cx from "classnames";
import { useRef } from "react";
import { patientDocumentColumns } from "./patient-document-columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientDocumentProps = {
  className?: string;
};

function PatientDocumentsComponent({ className }: PatientDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientDocumentQuery = usePatientDocument();
  const { featureFlags } = useCTW();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.dateCreated} - ${m.title}`,
    details: documentData,
  });

  const document = patientDocumentQuery.data ?? [];
  const { isLoading } = patientDocumentQuery;

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Documents"
      className={cx(
        "ctw-patient-documents ctw-scrollable-pass-through-height ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <Table
        stacked={breakpoints.sm}
        isLoading={isLoading}
        records={document}
        columns={patientDocumentColumns(featureFlags?.enableViewFhirButton)}
        handleRowClick={openDetails}
      />
    </div>
  );
}

export const PatientDocuments = withErrorBoundary(
  PatientDocumentsComponent,
  "PatientDocuments"
);

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
