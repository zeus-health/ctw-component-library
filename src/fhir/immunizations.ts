import { getIncludedBasics } from "./bundle";
import { ImmunizationModel } from "./models/immunization";
import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";

export function usePatientImmunizations() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: immunizations } = await searchCommonRecords(
          "Immunization",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        const models = setupImmunizationModels(immunizations, bundle);
        return orderBy(models, [(model) => model.occurance ?? ""], ["desc"]);
      } catch (e) {
        throw new Error(
          `Failed fetching immunization information for patient: ${e}`
        );
      }
    }
  );
}

function setupImmunizationModels(
  resources: fhir4.Immunization[],
  bundle: fhir4.Bundle
): ImmunizationModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return resources.map(
    (c) => new ImmunizationModel(c, undefined, basicsMap.get(c.id ?? ""))
  );
}
