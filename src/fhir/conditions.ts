import { ConditionModel } from "@/models/conditions";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sortBy } from "lodash";

import {
  flattenArrayFilters,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords
} from "./search-helpers";
import {
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED
} from "./system-urls";
import { getFhirClientFromQuery } from "./utils";

export const CONDITION_CODE_SYSTEMS = [
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_SNOMED,
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

export type QueryKeyConditionHistory = [
  string,
  string,
  ConditionModel | undefined
];
export type QueryKeyPatientConditions = [string, string, ConditionFilters];
export type QueryKeyOtherProviderConditions = [string, string];

export async function getPatientConditions(
  queryParams: QueryFunctionContext<QueryKeyPatientConditions>
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

export async function getOtherProviderConditions(
  queryParams: QueryFunctionContext<QueryKeyOtherProviderConditions>
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
    const [_, patientUPID, condition] = queryKey;

    if (!condition) {
      throw Error("Condition is required");
    }

    const tokens = condition.knownCodings.map(
      (coding) => `${coding.system}|${coding.code}`
    );

    const { resources: conditions } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        _include: ["Condition:patient", "Condition:encounter"],
        code: tokens.join(","),
      }
    );

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

export const filterConditionsWithConfirmedCodes = (
  target: fhir4.Condition[],
  confirmedCodes: fhir4.Coding[]
) =>
  target.filter((c) => {
    const conditionModel = new ConditionModel(c);

    return !confirmedCodes.some((code) =>
      conditionModel.knownCodings.some(
        (availableCode) =>
          availableCode.code === code.code &&
          availableCode.system === code.system
      )
    );
  });
