import { useQueryWithPatient } from "..";
import { searchCommonRecords } from "./search-helpers";
import { applyDocumentFilters } from "@/components/content/document/patient-document-filters";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_DOCUMENTS } from "@/utils/query-keys";

export function usePatientDocument() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_DOCUMENTS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: documents } = await searchCommonRecords(
          "DocumentReference",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return orderBy(
          applyDocumentFilters(documents),
          [
            (document) =>
              document.resource.content[0].attachment.creation || "",
          ],

          ["desc"]
        );
      } catch (e) {
        throw new Error(
          `Failed fetching document information for patient: ${e}`
        );
      }
    }
  );
}
