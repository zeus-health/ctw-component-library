import type { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";
import { useConditionDetailsDrawer } from "@/components/content/conditions/helpers/details";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { RenderIf } from "@/components/core/render-if";
import { ConditionModel } from "@/fhir/models";

type ResultConditionProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: ConditionModel;
};

export function ResultCondition({ result, resource }: ResultConditionProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useConditionDetailsDrawer({});

  const onsetLabel = resource.isSummaryResource ? "Earliest known onset:" : "Onset:";
  const notes = resource.notes.join(" ");

  return (
    <div className="ctw-patient-record-search-result-condition ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">
          Condition: {resource.display} {resource.ccsChapter}
        </h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>

      <div className="ctw-patient-record-search-details">
        <div data-label="Status">
          <div>
            {resource.recordedDate} {resource.recorder}
          </div>
        </div>
        <RenderIf condition={!!resource.onset}>
          <div data-label={onsetLabel}>{resource.onset}</div>
        </RenderIf>
        <RenderIf condition={!!notes}>
          <div data-label="Notes">
            <div className="ctw-line-clamp-2 ctw-overflow-hidden">{notes}</div>
          </div>
        </RenderIf>
      </div>

      <button
        type="button"
        className="ctw-patient-record-search-text-btn"
        onClick={() => openDetails(resource)}
      >
        {content}
      </button>
    </div>
  );
}
