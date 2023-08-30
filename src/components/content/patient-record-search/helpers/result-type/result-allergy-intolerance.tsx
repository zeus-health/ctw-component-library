import type { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";
import { useAllergiesHistory } from "@/components/content/allergies/helpers/history";
import { allergyData } from "@/components/content/allergies/patient-allergies";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { useResourceDetailsDrawer } from "@/components/content/resource/resource-details-drawer";
import { AllergyModel } from "@/fhir/models/allergies";
import { capitalize } from "@/utils/nodash";

type ResultAllergyIntoleranceProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: AllergyModel;
};

export function ResultAllergyIntolerance({ result, resource }: ResultAllergyIntoleranceProps) {
  const { metadata, page_content: content } = result;
  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
    enableDismissAndReadActions: true,
  });
  return (
    <div className="ctw-patient-record-search-result-allergy-intolerance ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">AllergyIntolerance: {resource.display}</h3>
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
