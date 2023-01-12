import { getIncludedBasics } from "./bundle";
import { EncounterModel } from "./models/encounter";
import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";

export function usePatientEncounters() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: encounters } = await searchCommonRecords(
          "Encounter",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        const models = setupEncounterModels(encounters, bundle);
        return models;
      } catch (e) {
        throw new Error(
          `Failed fetching timeline information for patient: ${e}`
        );
      }
    }
  );
}
function setupEncounterModels(
  resources: fhir4.Encounter[],
  bundle: fhir4.Bundle
): EncounterModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return resources.map(
    (c) => new EncounterModel(c, undefined, basicsMap.get(c.id ?? ""))
  );
}
