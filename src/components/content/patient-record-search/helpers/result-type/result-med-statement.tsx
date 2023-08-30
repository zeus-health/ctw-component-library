import type { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";
import { useMedicationDetailsDrawer } from "@/components/content/medications/helpers/details";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { MedicationStatementModel } from "@/fhir/models";

type ResultMedStatementProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: MedicationStatementModel;
};

export function ResultMedStatement({ result, resource }: ResultMedStatementProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useMedicationDetailsDrawer({});

  return (
    <div className="ctw-patient-record-search-result-med-statement ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">Medication: {resource.display}</h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>
      <button
        type="button"
        className="ctw-btn-clear ctw-btn ctw-font-medium hover:ctw-underline"
        onClick={() => openDetails(resource)}
      >
        <p className="ctw-line-clamp-3 ctw-overflow-ellipsis ctw-text-left">{content}</p>
      </button>
    </div>
  );
}
