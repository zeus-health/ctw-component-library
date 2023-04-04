import { getAllergiesQuery } from "./queries/allergies";
import { searchCommonRecords } from "./search-helpers";
import { createGraphqlClient } from "../services/fqs/client";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { withTimerMetric } from "@/utils/telemetry";

export type AllergyIntolerance = {
  AllergyIntoleranceList: fhir4.AllergyIntolerance[];
};

export function usePatientAllergies(enableFqs = false) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        let data;
        if (enableFqs) {
          const graphClient = createGraphqlClient(requestContext);
          data = (await graphClient.request(
            getAllergiesQuery(patient.UPID)
          )) as AllergyIntolerance;
          data = data.AllergyIntoleranceList;
        } else {
          const response = await searchCommonRecords(
            "AllergyIntolerance",
            requestContext,
            {
              patientUPID: patient.UPID,
            }
          );
          data = response.resources;
        }

        return orderBy(applyAllergyFilters(data), "onset", ["desc"]);
      } catch (e) {
        throw new Error(
          `Failed fetching allergies information for patient ${patient.UPID}`
        );
      }
    }, "req.patient_allergies")
  );
}
