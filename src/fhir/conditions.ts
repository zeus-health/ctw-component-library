import { SearchParams } from "fhir-kit-client";
import { orderBy } from "lodash";
import { getIncludedBasics } from "./bundle";
import { CodePreference } from "./codeable-concept";
import {
  searchBuilderRecords,
  searchCommonRecords,
  searchSummaryRecords,
} from "./search-helpers";
import {
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED,
} from "./system-urls";
import { getAddConditionWithDefaults } from "@/components/content/forms/actions/conditions";
import { useQueryWithPatient } from "@/components/core/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
import {
  QUERY_KEY_CONDITION_HISTORY,
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";

export type VerificationStatus =
  | "unconfirmed"
  | "provisional"
  | "differential"
  | "confirmed"
  | "refuted"
  | "entered-in-error";

export type ClinicalStatus =
  | "active"
  | "recurrence"
  | "relapse"
  | "inactive"
  | "remission"
  | "resolved";

export const CONDITION_CODE_PREFERENCE_ORDER: CodePreference[] = [
  { system: SYSTEM_SNOMED, checkForEnrichment: true },
  { system: SYSTEM_ICD10, checkForEnrichment: true },
  { system: SYSTEM_SNOMED },
  { system: SYSTEM_ICD10 },
  { system: SYSTEM_ICD10_CM },
  { system: SYSTEM_ICD9 },
  { system: SYSTEM_ICD9_CM },
];

export function getNewCondition(patientId: string) {
  const newCondition: fhir4.Condition = {
    resourceType: "Condition",
    subject: {
      type: "Patient",
      reference: `Patient/${patientId}`,
    },
  };
  return getAddConditionWithDefaults(newCondition);
}

export function usePatientConditions() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_CONDITIONS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: conditions } = await searchBuilderRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID,
          }
        );
        return filterAndSort(setupConditionModels(conditions, bundle));
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
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    async (requestContext, patient) => {
      try {
        const { bundle, resources: conditions } = await searchSummaryRecords(
          "Condition",
          requestContext,
          {
            _revinclude: "Basic:subject",
            patientUPID: patient.UPID,
          }
        );
        return filterAndSort(setupConditionModels(conditions, bundle));
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
    QUERY_KEY_CONDITION_HISTORY,
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
    },
    !!condition
  );
}

function setupConditionModels(
  conditionResources: fhir4.Condition[],
  bundle: fhir4.Bundle
): ConditionModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return conditionResources.map(
    (c) => new ConditionModel(c, undefined, basicsMap[c.id ?? ""])
  );
}

function filterAndSort(conditions: ConditionModel[]): ConditionModel[] {
  return orderBy(
    conditions.filter(
      (condition) => condition.resource.asserter?.type !== "Patient"
    ),
    [
      (condition) => condition.resource.recordedDate ?? "",
      (condition) => condition.display,
    ],
    ["desc"]
  );
}
