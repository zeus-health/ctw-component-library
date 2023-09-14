import fhir4 from "fhir/r4";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { Badge } from "@/components/core/badge";
import { FHIRModel } from "@/fhir/models/fhir-model";

type SearchResultProps<T extends FHIRModel<fhir4.Resource>> = {
  resource: T;
  heading?: string;
  label: string;
  openDetails?: (record: T) => void;
  text?: string | JSX.Element;
  details?: { label: string; value?: string }[];
};

export function SearchResult<T extends FHIRModel<fhir4.Resource>>({
  resource,
  heading,
  openDetails,
  label,
  text,
  details,
}: SearchResultProps<T>) {
  return (
    <div className="ctw-patient-record-search-result">
      <div className="ctw-flex ctw-items-end ctw-justify-between">
        <span>
          <button
            type="button"
            className="ctw-patient-record-search-result-btn"
            onClick={() => openDetails?.(resource)}
          >
            {heading}
          </button>
          <Badge color="primary" text={label} />
        </span>
        <FeedbackForm name={`${resource.resourceType}/${resource.id}`} />
      </div>
      <div className="ctw-patient-record-search-text">{text}</div>

      <div className="ctw-patient-record-search-details">
        {details?.map((detail) => (
          <div data-label={detail.label}>{detail.value}</div>
        ))}
      </div>
    </div>
  );
}
