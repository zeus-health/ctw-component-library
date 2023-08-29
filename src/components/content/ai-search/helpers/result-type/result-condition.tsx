import type { AiSearchResponseRawDocument } from "@/services/ai-search/ai-search";
import { FeedbackForm } from "@/components/content/ai-search/helpers/feedback-form";
import { useConditionDetailsDrawer } from "@/components/content/conditions/helpers/details";
import { ConditionModel } from "@/fhir/models";

type ResultConditionProps = {
  result: AiSearchResponseRawDocument;
  resource: ConditionModel;
};

export function ResultCondition({ result, resource }: ResultConditionProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useConditionDetailsDrawer({});

  return (
    <div className="ctw-ai-search-result-condition ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">Condition: {resource.display}</h3>
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
