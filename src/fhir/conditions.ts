import Client from "fhir-kit-client";

import {
  flattenArrayFilters,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
} from "./search-helpers";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";

export type ConditionFilters = {
  "clinical-status"?: ClinicalStatus | ClinicalStatus[];
};

export async function getConfirmedConditions(
  fhirClient: Client,
  patientUPID: string,
  conditionFilters: ConditionFilters = {}
) {
  try {
    const { resources: conditions } = await searchBuilderRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        ...flattenArrayFilters(conditionFilters),
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
  patientUPID: string,
  conditionFilters: ConditionFilters = {}
) {
  try {
    const { resources: conditions } = await searchLensRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
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

export async function getConditionHistory(
  fhirClient: Client,
  patientUPID: string
) {
  try {
    const { resources: conditions } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        _include: ["Condition:patient", "Condition:encounter"],
      }
    );
    return conditions;
  } catch (e) {
    throw new Error(
      `Failed fetching condition history information for patient: ${e}`
    );
  }
}
