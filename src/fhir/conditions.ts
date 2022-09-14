import { ConditionModel } from "@/models/conditions";
import Client from "fhir-kit-client";
import { sortBy } from "lodash";

import {
  flattenArrayFilters,
  searchBuilderRecords,
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

    return filterAndSort(conditions);
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
    return filterAndSort(conditions);
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}

function filterAndSort(conditions: fhir4.Condition[]) {
  return sortBy(
    conditions.filter((condition) => condition.asserter?.type !== "Patient"),
    (condition) => new ConditionModel(condition).display
  );
}
