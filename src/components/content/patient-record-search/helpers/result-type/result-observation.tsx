import { ObservationsColumns } from "@/components/content/observations/helpers/columns";
import { FeedbackForm } from "@/components/content/patient-record-search/helpers/feedback-form";
import { ResourceTable } from "@/components/content/resource/resource-table";
import { ObservationModel } from "@/fhir/models";
import { PatientRecordSearchResponseRawDocument } from "@/services/patient-record-search/patient-record-search";

type ResultObservationProps = {
  result: PatientRecordSearchResponseRawDocument;
  resource: ObservationModel;
};

export function ResultObservation({ result, resource }: ResultObservationProps) {
  const { metadata, page_content: content } = result;

  return (
    <div className="ctw-patient-record-search-result-observation ctw-text-left">
      <div className="ctw-flex ctw-flex-row ctw-items-end ctw-justify-between">
        <h3 className="ctw-mb-0">
          Observation: <span className="ctw-capitalize">{resource.display}</span>
        </h3>
        <FeedbackForm name={`${metadata.resource_type}/${metadata.resource_id}`} />
      </div>

      <div className="ctw-patient-record-search-details">
        <ResourceTable
          columns={ObservationsColumns()}
          data={[resource]}
          emptyMessage="Unable to display observation data."
          hidePagination
        />
      </div>

      {content}
    </div>
  );
}
