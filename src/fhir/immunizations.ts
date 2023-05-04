import { searchCommonRecords } from "./search-helpers";
import { applyImmunizationFilters } from "@/components/content/immunizations/patient-immunizations-filters";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientImmunizations() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const { resources: immunizations } = await searchCommonRecords(
          "Immunization",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        const results = orderBy(
          applyImmunizationFilters(immunizations),
          [(model) => model.occurrence ?? ""],
          ["desc"]
        );
        if (results.length === 0) {
          Telemetry.countMetric("req.count.immunizations.none");
        }
        Telemetry.histogramMetric("req.count.immunizations", results.length);
        return results;
      } catch (e) {
        throw new Error(`Failed fetching immunization information for patient: ${e}`);
      }
    }, "req.timing.immunizations")
  );
}
