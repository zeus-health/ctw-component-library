import cx from "classnames";
import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientDocumentColumns } from "./patient-document-columns";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientDocumentProps = {
  className?: string;
  includeViewFhirResource?: boolean;
};

export function PatientDocuments({
  className,
  includeViewFhirResource,
}: PatientDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientDocumentQuery = usePatientDocument();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.dateCreated} - ${m.title}`,
    details: documentData,
  });

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
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={isLoading}
        records={document}
        columns={patientDocumentColumns(includeViewFhirResource)}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}

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
