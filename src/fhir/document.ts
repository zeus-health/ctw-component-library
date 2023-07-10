import { useEffect, useState } from "react";
import { useBasic } from "./basic";
import { DocumentModel } from "./models/document";
import { searchCommonRecords } from "./search-helpers";
import { PatientModel, useFeatureFlaggedQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { DocumentReferenceGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientDocuments() {
  const fqs = useFQSFeatureToggle("documents");
  const [documents, setDocuments] = useState<DocumentModel[]>([]);

  const patientDocumentsQuery = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    "documents",
    "req.timing.documents",
    getDocumentFromFQS,
    getDocumentFromODS
  );

  const basicsQuery = useBasic(fqs);

  useEffect(() => {
    const patientDocuments = patientDocumentsQuery.data ?? [];
    const basics = basicsQuery.data ?? [];
    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      patientDocuments.forEach((a, i) => {
        const filteredBasics = basics.filter(
          (b) => b.subject?.reference === `DocumentReference/${a.id}`
        );
        patientDocuments[i].revIncludes = filteredBasics;
      });
    }

    setDocuments([...patientDocuments]); // spread syntax here needed to make sure the array is a new reference in order to trigger a re-render
  }, [basicsQuery.data, patientDocumentsQuery.data]);

  const isLoading = patientDocumentsQuery.isLoading || basicsQuery.isLoading;
  const isError = patientDocumentsQuery.isError || basicsQuery.isError;
  const isFetching = patientDocumentsQuery.isFetching || basicsQuery.isFetching || !fqs.ready;
  return {
    isLoading,
    isError,
    isFetching,
    data: documents,
  };
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
      Telemetry.countMetric("req.count.documents.none", 1, ["fqs"]);
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
