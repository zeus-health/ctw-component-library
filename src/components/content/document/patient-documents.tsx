import cx from "classnames";
import { useRef } from "react";
import { useDocumentDetailsDrawer } from "./document-details-drawer";
import { patientDocumentColumns } from "./patient-document-columns";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Table } from "@/components/core/table/table";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientDocumentProps = {
  className?: string;
  includeViewFhirResource?: boolean;
};

function PatientDocumentsComponent({
  className,
  includeViewFhirResource,
}: PatientDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientDocumentQuery = usePatientDocument();
  const openDetails = useDocumentDetailsDrawer();

  function handleRowClick(document: DocumentModel) {
    openDetails(document);
  }

  const document = patientDocumentQuery.data ?? [];
  const { isLoading } = patientDocumentQuery;

  return (
    <div
      ref={containerRef}
      data-zus-telemetry-namespace="Documents"
      className={cx("ctw-patient-documents ctw-bg-white", className, {
        "ctw-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-overflow-hidden">
        <Table
          stacked={breakpoints.sm}
          removeLeftAndRightBorders
          className="-ctw-mx-px !ctw-rounded-none"
          isLoading={isLoading}
          records={document}
          columns={patientDocumentColumns(includeViewFhirResource)}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export const PatientDocuments = withErrorBoundary(
  PatientDocumentsComponent,
  "PatientDocuments"
);
