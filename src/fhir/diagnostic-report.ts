import { useEffect, useState } from "react";
import { useIncludePatientBasics } from "./basic";
import { LOINC_ANALYTES } from "./models/observation";
import { usePatientObservations } from "./observations";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
import { createGraphqlClient, fqsRequest, MAX_OBJECTS_PER_REQUEST } from "@/services/fqs/client";
import {
  DiagnosticReportGraphqlResponse,
  getDiagnosticReportQuery,
} from "@/services/fqs/queries/diagnostic-reports-query";
import { isEqual, keys, uniqWith } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

// Gets diagnostic reports for the patient with an option to include observations, though be aware that
// including observations increases query time.
export function usePatientDiagnosticReports(
  limit = MAX_OBJECTS_PER_REQUEST,
  includeObservations = false
) {
  const query = useQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [limit, includeObservations], // Only use the IDs in our key (fixes issue with ciruclar references).
    withTimerMetric(
      getDiagnosticReports(limit, includeObservations),
      "req.timing.diagnostic_reports"
    )
  );

  return useIncludePatientBasics(query);
}

// Gets diagnostic reports for the patient with trending data for each observation in the diagnostic report.
// Each observation in the trend also includes a link back to its parent diagnostic report.
// This is an expensive operation that consumes a lot of memory!
export function usePatientDiagnosticReportsWithTrendData(limit = MAX_OBJECTS_PER_REQUEST) {
  const observationsQuery = usePatientObservations(keys(LOINC_ANALYTES));
  const diagnosticReportsQuery = usePatientDiagnosticReports(limit, true);
  const [diagnosticReportsWithTrends, setDiagnosticReportsWithTrends] = useState<
    DiagnosticReportModel[]
  >([]);

  useEffect(() => {
    const observations = observationsQuery.data ?? [];
    const diagnosticReports = diagnosticReportsQuery.data;

    const valuesToDedupeOn = (dr: DiagnosticReportModel) => [dr.displayName, dr.effectiveStart];
    const uniqueDiagnosticReports = uniqWith(diagnosticReports, (a, b) =>
      isEqual(valuesToDedupeOn(a), valuesToDedupeOn(b))
    );

    const observationsWithDiagnosticReportBackLink = observations.map((o) => {
      const observation = o;
      const diagnosticReport = uniqueDiagnosticReports.find((dr) =>
        dr.results.some((r) => r.reference === `Observation/${observation.id}`)
      );
      if (diagnosticReport) {
        // TODO - this seems like overkill, why do we need a full model here?
        observation.diagnosticReport = new DiagnosticReportModel(
          diagnosticReport.resource,
          undefined,
          undefined,
          observations
        );
      }
      return observation;
    });

    setDiagnosticReportsWithTrends(
      uniqueDiagnosticReports.map(
        (dr) =>
          new DiagnosticReportModel(
            dr.resource,
            undefined,
            undefined,
            observationsWithDiagnosticReportBackLink
          )
      )
    );
  }, [observationsQuery.data, diagnosticReportsQuery.data]);

  const isLoading = observationsQuery.isLoading || diagnosticReportsQuery.isLoading;
  const isError = observationsQuery.isError || diagnosticReportsQuery.isError;
  const isFetching = observationsQuery.isFetching || diagnosticReportsQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: diagnosticReportsWithTrends,
  };
}

function getDiagnosticReports(limit: number, includeObservations: boolean) {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const data = await fetchDiagnosticReportsFromFQS(
        requestContext,
        patient,
        limit,
        includeObservations
      );
      if (data.DiagnosticReportConnection.edges.length === 0) {
        Telemetry.countMetric(`req.count.diagnostic_reports.none`, 1);
      }
      const result = data.DiagnosticReportConnection.edges.map(
        (x) => new DiagnosticReportModel(x.node)
      );

      Telemetry.histogramMetric(`req.count.diagnostic_reports`, result.length);
      return result;
    } catch (e) {
      throw Telemetry.logError(e as Error, `Failed fetching DiagnosticReport resources`);
    }
  };
}

async function fetchDiagnosticReportsFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  limit: number,
  includeObservations: boolean
) {
  const graphClient = createGraphqlClient(requestContext);
  const { data } = await fqsRequest<DiagnosticReportGraphqlResponse>(
    graphClient,
    getDiagnosticReportQuery(includeObservations),
    {
      upid: patient.UPID,
      cursor: "",
      sort: {
        lastUpdated: "DESC",
      },
      filter: {},
      first: limit,
    }
  );
  return data;
}

export async function fetchDiagnosticReportsFromFQSById(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  ids: string[] = []
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<DiagnosticReportGraphqlResponse>(
      graphClient,
      getDiagnosticReportQuery(true),
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
    return data.DiagnosticReportConnection.edges.map((x) => new DiagnosticReportModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching document information for patient: ${e}`);
  }
}
