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
    <button
      type="button"
      onClick={() => openDetails(resource)}
      className="ctw-patient-record-search-result ctw-text-left"
    >
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">
          CCDA: <span className="ctw-capitalize">{resource.title}</span>
        </h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>

      <div className="ctw-patient-record-search-details">
        <div data-label="Encounter Date">{resource.encounterDate}</div>
        <div data-label="Date Retrieved">{resource.dateCreated}</div>
        <div data-label="Author">{resource.custodian}</div>
      </div>

      <div className="ctw-patient-record-search-text">{content}</div>
    </button>
  );
}
