import { useQueryWithPatient } from "..";
import { DocumentModel } from "./models/document";
import { searchCommonRecords } from "./search-helpers";
import { applyDocumentFilters } from "@/components/content/document/patient-document-filters";
import { orderBy } from "@/utils/nodash/fp";
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
        console.log("The documentReference query is, ");
        return orderBy(
          applyDocumentFilters(documents)
        ) as unknown as DocumentModel[];
      } catch (e) {
        throw new Error(
          `Failed fetching document information for patient: ${e}`
        );
      }
    }
  );
}
