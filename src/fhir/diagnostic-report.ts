import { searchBuilderRecords, searchCommonRecords } from "./search-helpers";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { getIncludedResources } from "@/fhir/bundle";
import { DiagnosticReportModel, PatientModel } from "@/fhir/models";
import { compact } from "@/utils/nodash/fp";
import {
  QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
  QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
} from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientDiagnosticReports() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DIAGNOSTIC_REPORTS,
    [],
    diagnosticReportsFetcher("builder")
  );
}

export function usePatientDiagnosticReportsOutside() {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_DIAGNOSTIC_REPORTS,
    [],
    diagnosticReportsFetcher("outside")
  );
}

export function useQueryAllPatientDiagnosticReports() {
  const builder = usePatientDiagnosticReports();
  const other = usePatientDiagnosticReportsOutside();

  const isLoading = builder.isLoading || other.isLoading;
  const isFetching = builder.isFetching || other.isFetching;
  const isError = builder.isError || other.isError;
  const errors = compact([builder.error, other.error]);

  return {
    data: {
      builderRecords: builder.data,
      otherRecords: other.data,
    },
    errors,
    isError,
    isFetching,
    isLoading,
  };
}

type SearchType = "builder" | "outside";
function diagnosticReportsFetcher(searchType: SearchType) {
  const fetchFunction =
    searchType === "builder" ? searchBuilderRecords : searchCommonRecords;
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const { resources, bundle } = await fetchFunction(
        "DiagnosticReport",
        requestContext,
        {
          patientUPID: patient.UPID,
          _include: ["DiagnosticReport:result"],
        }
      );

      return resources.map(
        (r) => new DiagnosticReportModel(r, getIncludedResources(bundle))
      );
    } catch (e) {
      throw Telemetry.logError(
        e as Error,
        `Failed fetching ${searchType} DiagnosticReport resources`
      );
    }
  };
}
