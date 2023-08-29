import { useEffect, useState } from "react";
import { useIncludeBasics } from "./basic";
import { DocumentModel } from "./models/document";
import { PatientModel, useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { DocumentReferenceGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientTopLevelDocuments() {
  const { data, isError, isFetching, isLoading } = usePatientDocuments();
  const [filteredData, setFilteredData] = useState([] as DocumentModel[]);

  useEffect(() => {
    const filteredDocuments = orderBy(
      applyDocumentFilters(data),
      "resource.content[0].attachment.creation",
      ["desc"]
    ) as DocumentModel[];
    if (!isFetching && !isLoading) {
      if (filteredDocuments.length === 0) {
        Telemetry.countMetric("req.count.documents.none", 1);
      }
      Telemetry.histogramMetric("req.count.documents", filteredDocuments.length);
    }
    setFilteredData(filteredDocuments);
  }, [data, isError, isFetching, isLoading]);

  return {
    data: filteredData,
    isError,
    isFetching,
    isLoading,
  };
}

export function usePatientDocuments() {
  const patientDocumentsQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    withTimerMetric(getDocumentFromFQS, "req.timing.documents")
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
    return data.DocumentReferenceConnection.edges.map((x) => new DocumentModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching document information for patient: ${e}`);
  }
}

export async function getDocumentsByIdFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  ids: string[] = []
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<DocumentReferenceGraphqlResponse>(
      graphClient,
      documentsQuery,
      {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        filter: {
          id: ["in", ids],
        },
        sort: {
          lastUpdated: "DESC",
        },
      }
    );
    return data.DocumentReferenceConnection.edges.map((x) => new DocumentModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching document information for patient: ${e}`);
  }
}
