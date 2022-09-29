import { ConditionModel } from "@/models/conditions";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sortBy } from "lodash";

import {
  flattenArrayFilters,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
} from "./search-helpers";
import { getFhirClientFromQuery } from "./utils";

export const ACCEPTABLE_CODES: (keyof ConditionModel)[] = [
  "snomedCode",
  "icd10Code",
  "icd10CMCode",
  "icd9Code",
  "icd9CMCode",
];

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

export type QueryKeyConfirmedConditions = [string, string, ConditionFilters];
export type QueryKeyLensConditions = [string, string];
export type QueryKeyConditionHistory = [string, string, Record<string, string>];

export async function getConfirmedConditions(
  queryParams: QueryFunctionContext<QueryKeyConfirmedConditions>
) {
  const { meta, queryKey } = queryParams;

  const fhirClient = getFhirClientFromQuery(meta);

  const [_, patientUPID, conditionFilters] = queryKey;
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
  queryParams: QueryFunctionContext<QueryKeyLensConditions>
) {
  const { meta, queryKey } = queryParams;
  const fhirClient = getFhirClientFromQuery(meta);

  const [_, patientUPID] = queryKey;
  try {
    const { resources: conditions } = await searchLensRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
      }
    );
    return filterAndSort(conditions);
  } catch (e) {
    throw new Error(`Failed fetching condition information for patient: ${e}`);
  }
}

export async function getConditionHistory(
  queryParams: QueryFunctionContext<QueryKeyConditionHistory>
) {
  try {
    const { meta, queryKey } = queryParams;
    const fhirClient = getFhirClientFromQuery(meta);
    const [_, patientUPID, searchParams] = queryKey;

    const { resources: conditions } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        _include: ["Condition:patient", "Condition:encounter"],
        ...searchParams,
      }
    );
    console.log("conditions", conditions);

    return conditions;
  } catch (e) {
    throw new Error(
      `Failed fetching condition history information for patient: ${e}`
    );
  }
}

function filterAndSort(conditions: fhir4.Condition[]) {
  return sortBy(
    conditions.filter((condition) => condition.asserter?.type !== "Patient"),
    (condition) => new ConditionModel(condition).display
  );
}
