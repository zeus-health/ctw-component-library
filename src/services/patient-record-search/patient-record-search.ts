import { UseQueryResult } from "@tanstack/react-query";
import fhir4 from "fhir/r4";
import { getZusServiceUrl } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getAllergyIntolerancesById } from "@/fhir/allergies";
import { fetchDiagnosticReportsById } from "@/fhir/diagnostic-report";
import { getDocumentsByIdFromFQS } from "@/fhir/document";
import { getMedicationStatementsByIdFQS } from "@/fhir/medications";
import {
  AllergyModel,
  ConditionModel,
  DiagnosticReportModel,
  MedicationStatementModel,
  ObservationModel,
  PatientModel,
} from "@/fhir/models";
import { DocumentModel } from "@/fhir/models/document";
import { fetchObservationsById } from "@/fhir/observations";
import { LENS_EXTENSION_ID } from "@/fhir/system-urls";
import { fetchConditionsByIdFQS } from "@/services/conditions";
import { groupBy, keyBy, mapValues, uniq } from "@/utils/nodash";
import { QUERY_KEY_AI_SEARCH } from "@/utils/query-keys";

type PatientRecordSearchResourceType =
  | "AllergyIntolerance"
  | "Condition"
  | "DocumentReference"
  | "MedicationStatement"
  | "Observation"
  | "DiagnosticReport";

type ResourceByTypeMapping = Record<
  PatientRecordSearchResourceType,
  PatientRecordSearchResponseRawDocument[]
>;
type ResourceIdByTypeMapping = Record<PatientRecordSearchResourceType, string[]>;

export type PatientRecordSearchResponseRawDocument = {
  original_content?: fhir4.Resource;
  page_content: string;
  summary: string;
  reason: {
    // highlighting behavior on N spans in page_content
    search_type: string[]; // origination of what the search engine did that surfaced this information
    span: { begin: number; end: number }[];
  };
  metadata: {
    resource_id: string;
    resource_type: PatientRecordSearchResourceType;
    subject: string;
    upid: string;
  };
};

export type PatientRecordSearchResponseRaw = {
  documents: PatientRecordSearchResponseRawDocument[];
  query: string;
  query_id: string;
  response: string;
  service_version: string;
};

export type PatientRecordSearchResult = {
  page_content: string;
  upid: string;
  document: PatientRecordSearchResponseRawDocument & {
    resource?:
      | AllergyModel
      | ConditionModel
      | DocumentModel
      | MedicationStatementModel
      | ObservationModel
      | DiagnosticReportModel;
  };
};

export type PatientRecordSearchResults = {
  id: string;
  results: readonly PatientRecordSearchResult[];
  query: string;
  response: string;
  total: number;
};

export const EMPTY_SEARCH_RESULTS: PatientRecordSearchResults = {
  id: "",
  query: "",
  response: "",
  results: [] as PatientRecordSearchResult[],
  total: 0,
};

const EMPTY_RESOURCE_BY_TYPE_MAPPING: ResourceByTypeMapping = {
  AllergyIntolerance: [],
  Condition: [],
  DocumentReference: [],
  MedicationStatement: [],
  DiagnosticReport: [],
  Observation: [],
};

class PatientRecordSearch {
  private response: PatientRecordSearchResponseRaw;

  private resources: {
    AllergyIntolerance: Record<string, AllergyModel>;
    Condition: Record<string, ConditionModel>;
    DocumentReference: Record<string, DocumentModel>;
    MedicationStatement: Record<string, MedicationStatementModel>;
    DiagnosticReport: Record<string, DiagnosticReportModel>;
    Observation: Record<string, ObservationModel>;
  } = {
    AllergyIntolerance: {},
    Condition: {},
    DocumentReference: {},
    MedicationStatement: {},
    DiagnosticReport: {},
    Observation: {},
  };

  constructor(patientRecordSearchResponse: PatientRecordSearchResponseRaw) {
    this.response = patientRecordSearchResponse;
  }

  get id(): string {
    return this.response.query_id;
  }

  get results(): PatientRecordSearchResult[] {
    return this.response.documents.map((group) => {
      const resource = this.resources[group.metadata.resource_type][group.metadata.resource_id];
      return {
        upid: group.metadata.upid,
        page_content: group.page_content,
        document: {
          ...group,
          resource,
        },
      };
    });
  }

  get filteredResults(): PatientRecordSearchResult[] {
    return this.results.filter((result) => {
      if (["Condition", "MedicationStatement"].includes(result.document.metadata.resource_type)) {
        const extensions = result.document.resource?.resource.extension ?? [];
        return extensions.some(({ url }) => url === LENS_EXTENSION_ID);
      }
      return !!result.document.resource;
    });
  }

  get queryString(): string {
    return this.response.query;
  }

  get responseString(): string {
    return this.response.response;
  }

  // Get a Map of all resource IDs from the search result by resource type
  get resourceIds(): ResourceIdByTypeMapping {
    const resourcesByTypePartial: Partial<ResourceByTypeMapping> = groupBy(
      this.response.documents,
      (r) => r.metadata.resource_type
    );

    const resourcesByType: ResourceByTypeMapping = {
      ...EMPTY_RESOURCE_BY_TYPE_MAPPING,
      ...resourcesByTypePartial,
    };

    return mapValues(resourcesByType, (docs) =>
      docs.map((resource) => resource.metadata.resource_id)
    );
  }

  // Set the resource models to their search results
  setResources(params: {
    allergies: AllergyModel[];
    conditions: ConditionModel[];
    documents: DocumentModel[];
    medications: MedicationStatementModel[];
    diagnosticReports: DiagnosticReportModel[];
    observations: ObservationModel[];
  }) {
    this.resources.AllergyIntolerance = keyBy(params.allergies, "id");
    this.resources.Condition = keyBy(params.conditions, "id");
    this.resources.DocumentReference = keyBy(params.documents, "id");
    this.resources.MedicationStatement = keyBy(params.medications, "id");
    this.resources.DiagnosticReport = keyBy(params.diagnosticReports, "id");
    this.resources.Observation = keyBy(params.observations, "id");
  }
}

export function usePatientRecordSearch(
  searchTerm: string,
  includeAnswer: boolean
): UseQueryResult<PatientRecordSearchResults> {
  return useQueryWithPatient(
    QUERY_KEY_AI_SEARCH,
    [searchTerm],
    async (requestContext: CTWRequestContext, patient: PatientModel) => {
      // fetchResourcesById will avoid lots of boilerplate code fetching various resources from FQS.
      const fetchResourcesById = async <T>(
        ids: string[],
        fn: (r: CTWRequestContext, p: PatientModel, ids: string[]) => Promise<T[]>
      ): Promise<T[]> => (ids.length === 0 ? [] : fn(requestContext, patient, uniq(ids)));

      if (searchTerm) {
        const searchOptions = ["keyword"];

        if (includeAnswer) {
          searchOptions.push("answer");
        }

        if (searchTerm.split(" ").length > 2) {
          searchOptions.push("semantic");
        }

        const body = JSON.stringify({
          query: searchTerm,
          upid: patient.UPID,
          include: searchOptions,
          n_results: includeAnswer ? 4 : 10, // TODO: This is a temporary hack to be kind to the search API when requesting the generative AI response.
          resource_types: [
            "AllergyIntolerance",
            "Condition",
            "DocumentReference",
            "MedicationStatement",
            "DiagnosticReport",
            // "Observation",
          ],
        });

        const response = await fetch(
          `${getZusServiceUrl(requestContext.env, "search-poc")}/search`,
          {
            body,
            method: "POST",
            headers: {
              Authorization: `Bearer ${requestContext.authToken}`,
              "Content-Type": "application/json",
              "Content-Length": body.length.toString(),
              "Zus-Account": requestContext.builderId,
            },
          }
        );

        const patientRecordSearchResult = new PatientRecordSearch(
          (await response.json()) as PatientRecordSearchResponseRaw
        );

        const {
          AllergyIntolerance: allergyIds,
          Condition: conditionIds,
          DocumentReference: documentIds,
          MedicationStatement: medicationIds,
          DiagnosticReport: diagnosticReportIds,
          Observation: observationIds,
        } = patientRecordSearchResult.resourceIds;

        const allergies = await fetchResourcesById(allergyIds, getAllergyIntolerancesById);
        const conditions = await fetchResourcesById(conditionIds, fetchConditionsByIdFQS);
        const documents = await fetchResourcesById(documentIds, getDocumentsByIdFromFQS);
        const medications = await fetchResourcesById(medicationIds, getMedicationStatementsByIdFQS);
        const observations = await fetchResourcesById(observationIds, fetchObservationsById);
        const diagnosticReports = await fetchResourcesById(
          diagnosticReportIds,
          fetchDiagnosticReportsById
        );

        patientRecordSearchResult.setResources({
          allergies,
          conditions,
          documents,
          medications,
          observations,
          diagnosticReports,
        });

        return {
          id: patientRecordSearchResult.id,
          query: patientRecordSearchResult.queryString,
          response: patientRecordSearchResult.responseString,
          results: patientRecordSearchResult.filteredResults.sort((r) =>
            r.document.reason.search_type.includes("semantic") ? 1 : -1
          ),
          total: patientRecordSearchResult.filteredResults.length,
        };
      }

      return EMPTY_SEARCH_RESULTS;
    }
  );
}
