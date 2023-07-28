import { useIncludeBasics } from "./basic";
import { searchCommonRecords } from "./search-helpers";
import { PatientModel, useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { DocumentReferenceGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientTopLevelDocuments() {
  const documents = usePatientDocuments2();
  const filteredDocuments = orderBy(
    applyDocumentFilters(documents),
    [(document) => document.resource.content[0].attachment.creation || ""],
    ["desc"]
  );
  return filteredDocuments;
}

export function usePatientDocuments2() {
  const patientDocumentsQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    withTimerMetric(getDocumentFromFQS, "req.timing.documents", ["fqs"])
  );

  return useIncludeBasics(patientDocumentsQuery, { enabled: true, ready: true });
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
    if (nodes.length === 0) {
      Telemetry.countMetric("req.count.documents.none", 1, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.documents", nodes.length, ["fqs"]);
    return nodes;
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
