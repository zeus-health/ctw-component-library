import type { AiSearchResult } from "@/services/ai-search/ai-search";
import { ResultAllergyIntolerance } from "./result-type/result-allergy-intolerance";
import { ResultCondition } from "./result-type/result-condition";
import { ResultDocument } from "./result-type/result-document";
import { ResultMedStatement } from "./result-type/result-med-statement";
import { ResultObservation } from "./result-type/result-observation";
import {
  AllergyModel,
  ConditionModel,
  DocumentModel,
  MedicationStatementModel,
  ObservationModel,
} from "@/fhir/models";

export type AiSearchResultRowProps = {
  result: AiSearchResult;
};

export const AiSearchResultRow = ({ result }: AiSearchResultRowProps) => {
  const { document } = result;
  return (
    <div className="ctw-border-b-1 ctw-w-full ctw-border-0 ctw-border-solid ctw-border-divider-light ctw-text-left">
      <ResourceRow document={document} />
    </div>
  );
};

type ResourceRowProps = {
  document: AiSearchResult["document"];
};

function ResourceRow(props: ResourceRowProps) {
  const { resource, ...result } = props.document;
  const resourceType = result.metadata.resource_type;
  const id = result.metadata.resource_id;

  switch (resourceType) {
    case "AllergyIntolerance":
      return <ResultAllergyIntolerance result={result} resource={resource as AllergyModel} />;

    case "Condition":
      return <ResultCondition result={result} resource={resource as ConditionModel} />;

    case "DocumentReference":
      return <ResultDocument result={result} resource={resource as DocumentModel} />;

    case "MedicationStatement":
      return <ResultMedStatement result={result} resource={resource as MedicationStatementModel} />;

    case "Observation":
      return <ResultObservation result={result} resource={resource as ObservationModel} />;

    default:
      return (
        <div>
          <p>
            {resourceType}/{id}
          </p>
        </div>
      );
  }
}
