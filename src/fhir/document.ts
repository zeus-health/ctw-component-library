import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { createGraphqlClient } from "@/services/fqs/client";
import { DocumentGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientDocument(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    enableFQS
      ? withTimerMetric(async (requestContext, patient) => {
          try {
            const graphClient = createGraphqlClient(requestContext);
            const data = (await graphClient.request(documentsQuery, {
              upid: patient.UPID,
              cursor: "",
              first: 1000,
              sort: {
                lastUpdated: "DESC",
              },
            })) as DocumentGraphqlResponse;
            const nodes = data.DocumentConnection.edges.map((x) => x.node);
            const results = orderBy(
              applyDocumentFilters(nodes),
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
        }, "req.timing.documents")
      : withTimerMetric(async (requestContext, patient) => {
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
        }, "req.timing.documents")
  );
}
