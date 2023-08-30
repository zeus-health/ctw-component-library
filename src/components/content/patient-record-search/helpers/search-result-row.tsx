import type { PatientRecordSearchResult } from "@/services/patient-record-search/patient-record-search";
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

type ResourceRowProps = {
  document: PatientRecordSearchResult["document"];
};

export function SearchResultRow(props: ResourceRowProps) {
  const { resource, ...result } = props.document;
  const resourceType = result.metadata.resource_type;

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
      // Unknown resource type
      return null;
  }
}
