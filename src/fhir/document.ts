import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "..";
import { applyDocumentFilters } from "@/components/content/document/patient-document-filters";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

export function usePatientDocument() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const { resources: documents } = await searchCommonRecords(
          "DocumentReference",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return orderBy(
          applyDocumentFilters(documents),
          [(document) => document.resource.content[0].attachment.creation || ""],

          ["desc"]
        );
      } catch (e) {
        throw new Error(`Failed fetching document information for patient: ${e}`);
      }
    }, "req.patient_document")
  );
}
