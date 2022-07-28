import Client from "fhir-kit-client";
import { sortBy } from "lodash";
import { searchCommonRecords } from "./search-helpers";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";

type ConditionFilters = {
  "clinical-status"?: ClinicalStatus;
};

export async function getConditions(
  fhirClient: Client,
  patientUPID: string,
  conditionFilters: ConditionFilters = {}
) {
  try {
    const { resources: conditions } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        ...conditionFilters,
      }
    );

    return sortBy(
      conditions.filter((condition) => condition.asserter?.type !== "Patient"),
      "id"
    );
  } catch (e) {
    throw new Error(
      "Failed fetching active conditions information for patient: " + e
    );
  }
}
