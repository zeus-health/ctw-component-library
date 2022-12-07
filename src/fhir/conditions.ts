import { SearchParams } from "fhir-kit-client";
import { orderBy } from "lodash";
import { CodePreference } from "./codeable-concept";
import { getPractitioner } from "./practitioner";
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
import { getZusApiBaseUrl } from "@/api/urls";
import { getAddConditionWithDefaults } from "@/components/content/forms/conditions";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { useQueryWithPatient } from "@/components/core/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
import { errorResponse } from "@/utils/errors";
import {
  QUERY_KEY_CONDITION_HISTORY,
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";

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
        const { resources: conditions } = await searchBuilderRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID as string,
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
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    async (requestContext, patient) => {
      try {
        const { resources: conditions } = await searchSummaryRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID as string,
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
    QUERY_KEY_CONDITION_HISTORY,
    [condition],
    async (requestContext, patient) => {
      if (!condition) return undefined;
      try {
        const tokens = condition.knownCodings.map(
          (coding) => `${coding.system}|${coding.code}`
        );

        const searchParams: SearchParams = {
          patientUPID: patient.UPID as string,
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

function filterAndSort(conditions: fhir4.Condition[]) {
  return orderBy(
    conditions.filter((condition) => condition.asserter?.type !== "Patient"),
    [
      (condition) => new ConditionModel(condition).resource.recordedDate ?? "",
      (condition) => new ConditionModel(condition).display,
    ],
    ["desc"]
  );
}

export const setRecorderField = async (
  practitionerId: string,
  requestContext: CTWRequestContext
) => {
  const practitioner = await getPractitioner(practitionerId, requestContext);
  const display = practitioner.fullName;

  return {
    reference: `Practitioner/${practitionerId}`,
    type: "Practitioner",
    display,
  };
};

export async function getDocument(
  requestContext: CTWRequestContext,
  patientID: string
) {
  // Call to Document Reference to see if Binary exists. If it exists, use it to obtain the binary document and return that.
  const endpointDocumentRefUrl = `${getZusApiBaseUrl(
    requestContext.env
  )}/DocumentReference?patient.identifer=${patientID}`;

  try {
    const bundle = await fetch(endpointDocumentRefUrl, {
      headers: {
        Authorization: `Bearer ${requestContext.authToken}`,
      },
    });

    const documents = await bundle.json();

    // const binaryID = find();

    // const endpointBinaryUrl = `${getZusApiBaseUrl(
    //   requestContext.env
    // )}/${binaryID}`;

    // const bundleID = await fetch();

    console.log(documents);
    return documents;
  } catch (err) {
    throw errorResponse("Failed fetching binary document", err);
  }
}
