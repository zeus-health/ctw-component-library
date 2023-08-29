import { useState } from "react";
import { FeedbackForm } from "@/components/content/ai-search/helpers/feedback-form";
import { ObservationsColumns } from "@/components/content/observations/helpers/columns";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { ObservationModel } from "@/fhir/models";
import { AiSearchResponseRawDocument } from "@/services/ai-search/ai-search";

type ResultObservationProps = {
  result: AiSearchResponseRawDocument;
  resource: ObservationModel;
};

export function ResultObservation({ result, resource }: ResultObservationProps) {
  const [showResource, setShowResource] = useState(false);
  const { metadata, page_content: content } = result;

  return (
    <div className="ctw-ai-search-result-observation ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">Observation: {resource.display}</h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>
      <button
        type="button"
        className="ctw-btn-clear ctw-btn ctw-font-medium"
        onClick={() => setShowResource(!showResource)}
      >
        <p className="ctw-line-clamp-3 ctw-overflow-ellipsis ctw-text-left">{content}</p>
      </button>
      {showResource && (
        <ResourceTable
          columns={ObservationsColumns()}
          data={[resource]}
          emptyMessage="Unable to display observation data."
          hidePagination
        />
      )}
    </div>
  );
}
