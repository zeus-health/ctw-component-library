import type { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";
import { useMedicationDetailsDrawer } from "@/components/content/medications/helpers/details";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { RenderIf } from "@/components/core/render-if";
import { MedicationStatementModel } from "@/fhir/models";

type ResultMedStatementProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: MedicationStatementModel;
};

export function ResultMedStatement({ result, resource }: ResultMedStatementProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useMedicationDetailsDrawer({});
  const { lastPrescribedDate, lastPrescriber } = resource;

  return (
    <div className="ctw-patient-record-search-result-med-statement ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">
          Medication: {resource.display} {resource.dosage}
        </h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>

      <div className="ctw-patient-record-search-details ctw-table-stacked">
        <div data-label="Dispensed" className="ctw-stacked-concat">
          {resource.quantity && <div>{resource.quantity}</div>}
          {resource.refills && <div>{resource.refills} refills</div>}
        </div>
        <div data-label="Last Filled">{resource.lastFillDate}</div>
        <RenderIf condition={!!(lastPrescriber || lastPrescribedDate)}>
          <div data-label="Last Prescribed" className="ctw-stacked-concat">
            {lastPrescribedDate} {lastPrescriber}
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
