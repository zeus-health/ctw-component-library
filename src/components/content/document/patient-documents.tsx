import cx from "classnames";
import { useEffect, useRef } from "react";
import { patientDocumentColumns } from "./patient-document-columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientDocument } from "@/fhir/document";
import { DocumentModel } from "@/fhir/models/document";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { Telemetry } from "@/utils/telemetry";

export type PatientDocumentProps = {
  className?: string;
};

function PatientDocumentsComponent({ className }: PatientDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const query = usePatientDocument();
  const { featureFlags } = useCTW();
  const openDetails = useResourceDetailsDrawer({
    header: (m) => `${m.dateCreated} - ${m.title}`,
    details: documentData,
  });

  const document = query.data ?? [];

  useEffect(() => {
    if (!query.isLoading) {
      Telemetry.reportZAPRecordCount("builder_conditions", query.data?.length);
    }
  }, [query.isLoading, query.data]);

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
        isLoading={query.isLoading}
        records={document}
        columns={patientDocumentColumns(featureFlags?.enableViewFhirButton)}
        handleRowClick={openDetails}
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
