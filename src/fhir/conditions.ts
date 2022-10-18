import { ConditionModel } from "@/models/condition";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sortBy } from "lodash";

import {
  flattenArrayFilters,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
} from "./search-helpers";
import {
  SYSTEM_CONDITION_CLINICAL,
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED,
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
export type QueryKeyPatientConditions = [
  string,
  string | undefined,
  ConditionFilters
];
export type QueryKeyOtherProviderConditions = [string, string | undefined];

export function getNewCondition(patientId: string) {
  const newCondition: fhir4.Condition = {
    resourceType: "Condition",
    subject: {
      type: "Patient",
      reference: `Patient/${patientId}`,
    },
    clinicalStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_CLINICAL,
          code: "active",
          display: "Active",
        },
      ],
      text: "active",
    },
    verificationStatus: {
      coding: [
        {
          system: SYSTEM_CONDITION_VERIFICATION_STATUS,
          code: "confirmed",
          display: "Confirmed",
        },
      ],
      text: "confirmed",
    },
  };

  return newCondition;
}

export async function getPatientConditions(
  queryParams: QueryFunctionContext<QueryKeyPatientConditions>
) {
  const { meta, queryKey } = queryParams;

  const fhirClient = getFhirClientFromQuery(meta);

  const [_, patientUPID, conditionFilters] = queryKey;

  if (!patientUPID) {
    throw new Error("Patient UPID is required to run getPatientConditions");
  }

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

  if (!patientUPID) {
    throw new Error(
      "Patient UPID is required to run getOtherProviderConditions"
    );
  }

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
      throw new Error("Condition is required");
    }

    const tokens = condition.knownCodings.map(
      (coding) => `${coding.system}|${coding.code}`
    );

    const { resources: conditions, bundle } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        _include: ["Condition:patient", "Condition:encounter"],
        "_include:iterate": "Patient:organization",
        code: tokens.join(","),
      }
    );

    return { conditions, bundle };
  } catch (e) {
    throw new Error(
      `Failed fetching condition history information for patient: ${e}`
    );
  }
}

function filterAndSort(conditions: fhir4.Condition[]) {
  return sortBy(
    conditions.filter((condition) => condition.asserter?.type !== "Patient"),
    (condition) => new ConditionModel(condition).ccsGrouping,
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
