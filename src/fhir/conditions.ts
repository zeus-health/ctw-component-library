import { useQueryWithPatient } from "@/components/core/patient-provider";
import { ConditionModel } from "@/models/conditions";
import {
  CONDITION_HISTORY_KEY,
  OTHER_PROVIDER_CONDITIONS_KEY,
  PATIENT_CONDITIONS_KEY,
} from "@/utils/query-keys";
import { SearchParams } from "fhir-kit-client";
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

export function usePatientConditions(conditionFilters: ConditionFilters) {
  return useQueryWithPatient(
    PATIENT_CONDITIONS_KEY,
    [conditionFilters],
    async (requestContext, patient) => {
      try {
        const { resources: conditions } = await searchBuilderRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID,
            ...flattenArrayFilters(conditionFilters),
          }
        );
        return filterAndSort(conditions);
      } catch (e) {
        throw new Error(
          `Failed fetching condition information for patient: ${e}`
        );
      }
    }
  );
}

export function useOtherProviderConditions() {
  return useQueryWithPatient(
    OTHER_PROVIDER_CONDITIONS_KEY,
    [],
    async (requestContext, patient) => {
      try {
        const { resources: conditions } = await searchLensRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return filterAndSort(conditions);
      } catch (e) {
        throw new Error(
          `Failed fetching condition information for patient: ${e}`
        );
      }
    }
  );
}

export function useConditionHistory(condition?: ConditionModel) {
  return useQueryWithPatient(
    CONDITION_HISTORY_KEY,
    [condition],
    async (requestContext, patient) => {
      if (!condition) return undefined;

      try {
        const tokens = condition.knownCodings.map(
          (coding) => `${coding.system}|${coding.code}`
        );

        const searchParams: SearchParams = {
          patientUPID: patient.UPID,
          _include: ["Condition:patient", "Condition:encounter"],
          "_include:iterate": "Patient:organization",
        };

        // If we have any known codings, then do an OR search.
        // Otherwise fall back to searching for this single condition.
        // That way, conditions that don't have any good codes to match on
        // will only show themselves in the history.
        if (tokens.length > 0) {
          searchParams.code = tokens.join(",");
        } else {
          // eslint-disable-next-line no-underscore-dangle
          searchParams._id = condition.id;
        }

        const { resources: conditions, bundle } = await searchCommonRecords(
          "Condition",
          requestContext,
          searchParams
        );

        return { conditions, bundle };
      } catch (e) {
        throw new Error(
          `Failed fetching condition history information for patient: ${e}`
        );
      }
    }
  );
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
