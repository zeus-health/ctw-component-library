import cx from "classnames";
import { useRef } from "react";
import { useDocumentDetailsDrawer } from "./document-details-drawer";
import { patientImmunizationsColumns } from "./patient-document-columns";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { ViewFHIR } from "@/components/core/view-fhir";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientDocumentProps = {
  className?: string;
};

const viewRecordFHIR = ({ record }: { record: DocumentModel }) => (
  <ViewFHIR name="DocumentReference Resource" resource={record.resource} />
);

export function PatientDocuments({ className }: PatientDocumentProps) {
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
      className={cx(
        "ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <Heading title="Documents" />
      <Table
        RowActions={viewRecordFHIR}
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={isLoading}
        records={document}
        columns={patientImmunizationsColumns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
