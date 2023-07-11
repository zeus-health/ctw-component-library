import { useIncludeBasics } from "./basic";
import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { SYSTEM_ZUS_THIRD_PARTY } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  DiagnosticReportGraphqlResponse,
  diagnosticReportQuery,
} from "@/services/fqs/queries/diagnostic-reports-query";
import {
  QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
  QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
} from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

type SearchType = "builder" | "all";

export function usePatientBuilderDiagnosticReports() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [],
    "diagnosticReports",
    "req.timing.builder_diagnostic_reports",
    diagnosticReportsFetcherFQS("builder"),
    diagnosticReportsFetcherODS("builder")
  );
}

export function usePatientAllDiagnosticReports() {
  const fqs = useFQSFeatureToggle("diagnosticReports");

  const query = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
    [],
    "diagnosticReports",
    "req.timing.all_diagnostic_reports",
    diagnosticReportsFetcherFQS("all"),
    diagnosticReportsFetcherODS("all")
  );

  return useIncludeBasics(query, fqs);
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
        `Failed fetching ${searchType} DiagnosticReport resources (ODS)`
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
        Telemetry.countMetric(`req.count.${searchType}_diagnostic_reports.none`, 1, ["fqs"]);
      }
      const result = setupDiagnosticReportModelsWithFQS(
        data.DiagnosticReportConnection.edges.map((x) => x.node)
      );

      Telemetry.histogramMetric(`req.count.${searchType}_diagnostic_reports`, result.length, [
        "fqs",
      ]);
      return result;
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching ${searchType} DiagnosticReport resources (FQS)`
      );
    }
  };
}

async function diagnosticReportBuilderQueryFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  const graphClient = createGraphqlClient(requestContext);
  const { data } = await fqsRequest<DiagnosticReportGraphqlResponse>(
    graphClient,
    diagnosticReportQuery,
    {
      upid: patient.UPID,
      cursor: "",
      sort: {
        lastUpdated: "DESC",
      },
      filter: {
        tag: {
          nonematch: [SYSTEM_ZUS_THIRD_PARTY],
        },
      },
      first: 1000,
    }
  );
  return data;
}

async function diagnosticReportCommonQueryFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  const graphClient = createGraphqlClient(requestContext);
  const { data } = await fqsRequest<DiagnosticReportGraphqlResponse>(
    graphClient,
    diagnosticReportQuery,
    {
      upid: patient.UPID,
      cursor: "",
      sort: {
        lastUpdated: "DESC",
      },
      filter: {
        tag: {
          allmatch: [SYSTEM_ZUS_THIRD_PARTY],
        },
      },
      first: 1000,
    }
  );
  return data;
}

function setupDiagnosticReportModelsWithFQS(
  diagnosticResource: fhir4.DiagnosticReport[]
): DiagnosticReportModel[] {
  return diagnosticResource.map((d) => new DiagnosticReportModel(d));
}
