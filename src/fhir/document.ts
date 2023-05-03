import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/patient-document-filters";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientDocument() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const { resources } = await searchCommonRecords("DocumentReference", requestContext, {
          patientUPID: patient.UPID,
        });
        const results = orderBy(
          applyDocumentFilters(resources),
          [(document) => document.resource.content[0].attachment.creation || ""],

          ["desc"]
        );
        Telemetry.countMetric("req.documents", results.length);
        return results;
      } catch (e) {
        throw new Error(`Failed fetching document information for patient: ${e}`);
      }
    }, "req.documents")
  );
}
