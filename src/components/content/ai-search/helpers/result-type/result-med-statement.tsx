import type { AiSearchResponseRawDocument } from "@/services/ai-search/ai-search";
import { FeedbackForm } from "@/components/content/ai-search/helpers/feedback-form";
import { useMedicationDetailsDrawer } from "@/components/content/medications/helpers/details";
import { MedicationStatementModel } from "@/fhir/models";

type ResultMedStatementProps = {
  result: AiSearchResponseRawDocument;
  resource: MedicationStatementModel;
};

export function ResultMedStatement({ result, resource }: ResultMedStatementProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useMedicationDetailsDrawer({});

  return (
    <div className="ctw-ai-search-result-med-statement">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">Medication: {resource.display}</h3>
        <FeedbackForm name={metadata.resource_id} />
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
