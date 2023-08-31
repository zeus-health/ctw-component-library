import { BubbleIcon } from "@/components/content/observations/helpers/bubble";
import { ObservationTrends } from "@/components/content/observations/helpers/trends";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { ObservationModel } from "@/fhir/models";
import { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";

type ResultObservationProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: ObservationModel;
};

export function ResultObservation({ result, resource }: ResultObservationProps) {
  const { metadata, page_content: content } = result;

  return (
    <div className="ctw-patient-record-search-result">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">
          Observation: <span className="ctw-capitalize">{resource.display}</span>
        </h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>

      <div className="ctw-patient-record-search-details">
        <div data-label="Result">
          <BubbleIcon
            interpretation={resource.interpretation}
            result={resource.value}
            className={resource.acceptedInterpretations}
          />
        </div>
        <div data-label="Reference Range">
          {resource.referenceRange} {resource.unit}
        </div>
        <div data-label="">
          <ObservationTrends model={resource} />
        </div>
      </div>

      <div className="ctw-patient-record-search-text">{content}</div>
    </div>
  );
}
