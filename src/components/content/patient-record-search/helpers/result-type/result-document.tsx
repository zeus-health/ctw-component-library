import type { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";
import { documentData } from "@/components/content/document/patient-documents";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { useResourceDetailsDrawer } from "@/components/content/resource/resource-details-drawer";
import { DocumentModel } from "@/fhir/models";

type ResultDocumentProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: DocumentModel;
};

export function ResultDocument({ result, resource }: ResultDocumentProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.title,
    subHeader: (m) => m.encounterDate,
    details: documentData,
    enableDismissAndReadActions: false,
  });

  return (
    <div className="ctw-patient-record-search-result-document ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">CCDA: {resource.title}</h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>
      <button
        type="button"
        className="ctw-btn-clear ctw-btn ctw-font-medium"
        onClick={() => openDetails(resource)}
      >
        <p className="ctw-line-clamp-3 ctw-overflow-ellipsis ctw-text-left">{content}</p>
      </button>
    </div>
  );
}
