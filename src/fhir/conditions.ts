import Client from "fhir-kit-client";

import { searchBuilderRecords, searchLensRecords } from "./search-helpers";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";

export type ConditionFilters = {
  "clinical-status"?: ClinicalStatus;
};

export async function getConfirmedConditions(
  fhirClient: Client,
  patientID: string,
  conditionFilters: ConditionFilters = {}
) {
  try {
    const { resources: conditions } = await searchBuilderRecords(
      "Condition",
      fhirClient,
      {
        patientID,
        ...conditionFilters,
      }
    );
    return conditions.filter(
      (condition) => condition.asserter?.type !== "Patient"
    );
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}

export async function getLensConditions(
  fhirClient: Client,
  patientID: string,
  conditionFilters: ConditionFilters = {}
) {
  try {
    const { resources: conditions } = await searchLensRecords(
      "Condition",
      fhirClient,
      {
        patientID,
        ...conditionFilters,
      }
    );
    return conditions.filter(
      (condition) => condition.asserter?.type !== "Patient"
    );
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}
