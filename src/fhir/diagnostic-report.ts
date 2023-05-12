import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
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

function diagnosticReportsFetcher(searchType: SearchType) {
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
