import { useEffect, useState } from "react";
import { useIncludeBasics } from "./basic";
import { DocumentModel } from "./models/document";
import { PatientModel, useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest, MAX_OBJECTS_PER_REQUEST } from "@/services/fqs/client";
import { DocumentReferenceGraphqlResponse, documentsQuery } from "@/services/fqs/queries/documents";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientTopLevelDocuments(limit = MAX_OBJECTS_PER_REQUEST) {
  const { data, isError, isFetching, isLoading } = usePatientDocuments(limit);
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

export function usePatientDocuments(limit = MAX_OBJECTS_PER_REQUEST) {
  const patientDocumentsQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [limit],
    withTimerMetric(getDocumentsFromFQS(limit), "req.timing.documents")
  );

  return useIncludeBasics(patientDocumentsQuery);
}

function getDocumentsFromFQS(limit: number) {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const graphClient = createGraphqlClient(requestContext);
      const { data } = await fqsRequest<DocumentReferenceGraphqlResponse>(
        graphClient,
        documentsQuery,
        {
          upid: patient.UPID,
          cursor: "",
          first: limit,
          sort: {
            lastUpdated: "DESC",
          },
        }
      );
      return data.DocumentReferenceConnection.edges.map((x) => new DocumentModel(x.node));
    } catch (e) {
      throw new Error(`Failed fetching document information for patient: ${e}`);
    }
  };
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
          ids: {
            anymatch: ids,
          },
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
