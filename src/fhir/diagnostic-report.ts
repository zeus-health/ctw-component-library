import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_THIRD_PARTY } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
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

export function usePatientBuilderDiagnosticReports(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      const service = enableFQS ? diagnosticReportsFetcherFQS : diagnosticReportsFetcherODS;
      return service("builder")(requestContext, patient);
    }, "req.timing.builder_diagnostic_reports")
  );
}

export function usePatientAllDiagnosticReports(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      const service = enableFQS ? diagnosticReportsFetcherFQS : diagnosticReportsFetcherODS;
      return service("all")(requestContext, patient);
    }, "req.timing.all_diagnostic_reports")
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
      const data = await fetchFunction(requestContext, patient);
      if (searchType === "all" && data.DiagnosticReportConnection.edges.length === 0) {
        Telemetry.countMetric(`req.count.${searchType}_diagnostic_reports.none`);
      }
      const result = setupDiagnosticReportModelsWithFQS(
        data.DiagnosticReportConnection.edges.map((x) => x.node)
      );
      Telemetry.histogramMetric(`req.count.${searchType}_diagnostic_reports`, result.length);
      return result;
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

function setupDiagnosticReportModelsWithFQS(
  diagnosticResource: fhir4.DiagnosticReport[]
): DiagnosticReportModel[] {
  return diagnosticResource.map((d) => new DiagnosticReportModel(d));
}
