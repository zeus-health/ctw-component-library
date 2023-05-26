import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_THIRD_PARTY } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
import { resources } from "@/i18n";
import { createGraphqlClient } from "@/services/fqs/client";
import {
  DiagnosticReportGraphqlResponse,
  diagnosticReportQuery,
} from "@/services/fqs/queries/diagnostic-reports-query";
import {
  QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
  QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
} from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

type SearchType = "builder" | "all";

export function usePatientBuilderDiagnosticReports() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [],
    withTimerMetric(
      async (requestContext, patient) =>
        diagnosticReportsFetcher("builder")(requestContext, patient),
      "req.timing.builder_diagnostic_reports"
    )
  );
}

export function usePatientAllDiagnosticReports() {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
    [],
    withTimerMetric(
      async (requestContext, patient) => diagnosticReportsFetcher("all")(requestContext, patient),
      "req.timing.all_diagnostic_reports"
    )
  );
}

function diagnosticReportsFetcherODS(searchType: SearchType) {
  const fetchFunction = searchType === "builder" ? searchBuilderRecords : searchCommonRecords;
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const { resources, bundle } = await fetchFunction("DiagnosticReport", requestContext, {
        patientUPID: patient.UPID,
        _include: ["DiagnosticReport:result"],
      });
      if (searchType === "all" && resources.length === 0) {
        Telemetry.countMetric(`req.count.${searchType}_diagnostic_reports.none`);
      }
      Telemetry.histogramMetric(`req.count.${searchType}_diagnostic_reports`, resources.length);
      return resources.map((r) => new DiagnosticReportModel(r, getIncludedResources(bundle)));
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching ${searchType} DiagnosticReport resources`
      );
    }
  };
}

function diagnosticReportsFetcherFQS(searchType: SearchType) {
  const fetchFunction =
    searchType === "builder" ? diagnosticReportBuilderQueryFQS : diagnosticReportCommonQueryFQS;
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const result = await fetchFunction(requestContext, patient);
      if (searchType === "all" && result.DiagnosticReportConnection.edges.length === 0) {
        Telemetry.countMetric(`req.count.${searchType}_diagnostic_reports.none`);
      }
      Telemetry.histogramMetric(`req.count.${searchType}_diagnostic_reports`, resources.length);
      return resources.map((r) => new DiagnosticReportModel(r, getIncludedResources(bundle)));
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching ${searchType} DiagnosticReport resources`
      );
    }
  };
}

async function diagnosticReportBuilderQueryFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  const graphClient = createGraphqlClient(requestContext);
  const data = (await graphClient.request(diagnosticReportQuery, {
    upid: patient.UPID,
    cursor: "",
    first: 1000,
    sort: {
      lastUpdated: "DESC",
    },
    filter: {
      tag: {
        nonematch: [SYSTEM_SUMMARY, SYSTEM_ZUS_THIRD_PARTY],
      },
    },
  })) as DiagnosticReportGraphqlResponse;
  return data;
}

async function diagnosticReportCommonQueryFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  const graphClient = createGraphqlClient(requestContext);
  const data = (await graphClient.request(diagnosticReportQuery, {
    upid: patient.UPID,
    cursor: "",
    first: 1000,
    sort: {
      lastUpdated: "DESC",
    },
    filter: {
      tag: {
        allmatch: [SYSTEM_SUMMARY],
      },
    },
  })) as DiagnosticReportGraphqlResponse;
  return data;
}
