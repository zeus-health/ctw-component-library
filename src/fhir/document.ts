import { searchCommonRecords } from "./search-helpers";
import { PatientModel, useFeatureFlaggedQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { DocumentReferenceGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientDocuments() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    "documents",
    "req.timing.documents",
    getDocumentFromFQS,
    getDocumentFromODS
  );
}

async function getDocumentFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<DocumentReferenceGraphqlResponse>(
      graphClient,
      documentsQuery,
      {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
      }
    );
    const nodes = data.DocumentReferenceConnection.edges.map((x) => x.node);
    const results = orderBy(
      applyDocumentFilters(nodes),
      [(document) => document.resource.content[0].attachment.creation || ""],
      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.documents.none", 0, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.documents", results.length, ["fqs"]);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching document information for patient: ${e}`);
  }
}

async function getDocumentFromODS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const { resources } = await searchCommonRecords("DocumentReference", requestContext, {
      patientUPID: patient.UPID,
    });
    const results = orderBy(
      applyDocumentFilters(resources),
      [(document) => document.resource.content[0].attachment.creation || ""],

      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.documents.none");
    }
    Telemetry.histogramMetric("req.count.documents", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching document information for patient: ${e}`);
  }
}
