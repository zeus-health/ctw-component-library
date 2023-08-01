import { useIncludeBasics } from "./basic";
import { LOINC_ANALYTES, ObservationModel } from "./models/observation";
import { usePatientObservationsTrendData } from "./observations";
import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { SYSTEM_ZUS_THIRD_PARTY } from "./system-urls";
import { applyDiagnosticReportFilters } from "@/components/content/diagnostic-reports/helpers/diagnostic-report-query-filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { PatientModel } from "@/fhir/models";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  DiagnosticReportGraphqlResponse,
  diagnosticReportQuery,
} from "@/services/fqs/queries/diagnostic-reports-query";
import { keys } from "@/utils/nodash";
import {
  QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
  QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
} from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

type SearchType = "builder" | "all";

export function usePatientBuilderDiagnosticReports() {
  const { data } = usePatientObservationsTrendData(keys(LOINC_ANALYTES));
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [data?.map((o) => o.id)], // Only use the IDs in our key (fixes issue with ciruclar references).
    "diagnosticReports",
    "req.timing.builder_diagnostic_reports",
    diagnosticReportsFetcherFQS("builder", data ?? []),
    diagnosticReportsFetcherODS("builder", data ?? [])
  );
}

export function usePatientAllDiagnosticReports() {
  const fqs = useFQSFeatureToggle("diagnosticReports");
  const { data } = usePatientObservationsTrendData(keys(LOINC_ANALYTES));

  const query = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
    [data?.map((o) => o.id)], // Only use the IDs in our key (fixes issue with ciruclar references).
    "diagnosticReports",
    "req.timing.all_diagnostic_reports",
    diagnosticReportsFetcherFQS("all", data ?? []),
    diagnosticReportsFetcherODS("all", data ?? [])
  );

  return useIncludeBasics(query, fqs);
}

function diagnosticReportsFetcherODS(searchType: SearchType, trendData: ObservationModel[]) {
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
      return applyDiagnosticReportFilters(resources, getIncludedResources(bundle), trendData);
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching ${searchType} DiagnosticReport resources (ODS)`
      );
    }
  };
}

function diagnosticReportsFetcherFQS(searchType: SearchType, trendData: ObservationModel[]) {
  const fetchFunction =
    searchType === "builder" ? diagnosticReportBuilderQueryFQS : diagnosticReportCommonQueryFQS;
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const data = await fetchFunction(requestContext, patient);
      if (searchType === "all" && data.DiagnosticReportConnection.edges.length === 0) {
        Telemetry.countMetric(`req.count.${searchType}_diagnostic_reports.none`, 1, ["fqs"]);
      }
      const result = data.DiagnosticReportConnection.edges.map((x) => x.node);

      Telemetry.histogramMetric(`req.count.${searchType}_diagnostic_reports`, result.length, [
        "fqs",
      ]);

      trendData.forEach((observation, i) => {
        const diagnosticReport = result.find((dr) =>
          dr.result?.some((r) => r.reference === `Observation/${observation.id}`)
        );
        // eslint-disable-next-line no-param-reassign
        trendData[i].diagnosticReport = diagnosticReport;
      });

      return applyDiagnosticReportFilters(result, undefined, trendData);
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
      filter: {},
      first: 1000,
    }
  );
  return data;
}
