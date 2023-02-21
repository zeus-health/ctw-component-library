import { useQueryWithPatient } from "..";
import { getIncludedBasics } from "./bundle";
import { DocumentModel } from "./models/document";
import { searchCommonRecords } from "./search-helpers";
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
            subject: `Patient/${patient.id}`,
          }
        );
        const models = setupDocumentModel(documents, bundle);

        return models;
      } catch (e) {
        throw new Error(
          `Failed fetching document information for patient: ${e}`
        );
      }
    }
  );
}

function setupDocumentModel(
  resources: fhir4.DocumentReference[],
  bundle: fhir4.Bundle
): DocumentModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return resources.map(
    (c) => new DocumentModel(c, undefined, basicsMap.get(c.id ?? ""))
  );
}
