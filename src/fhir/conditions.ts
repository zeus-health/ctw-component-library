import { SearchParams } from "fhir-kit-client";
import { orderBy } from "lodash";
import { getIncludedBasics } from "./bundle";
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
import { CollapsibleDataListProps } from "@/components/core/collapsible-data-list";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { useQueryWithPatient } from "@/components/core/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
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
        const { bundle, resources: conditions } = await searchBuilderRecords(
          "Condition",
          requestContext,
          {
            patientUPID: patient.UPID as string,
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
            patientUPID: patient.UPID as string,
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

export type SourceDocumentMap = Map<string, BinaryDocumentData>;

export type BinaryDocumentData = {
  xmlBinary: fhir4.Binary | undefined;
  isBinary: boolean;
};

export async function getBinary(
  requestContext: CTWRequestContext,
  conditionsData?: CollapsibleDataListProps[]
): Promise<SourceDocumentMap> {
  // Call to Provenance for the conditionID to see if Binary exists. If it exists, use it to obtain the binary document and return that.

  console.log("ConditionsData when entering getBinary", conditionsData);

  const binaryObjects: Map<string, BinaryDocumentData> = new Map();

  // No conditions in the history drawer.
  if (!conditionsData) {
    return binaryObjects;
  }

  await Promise.all(
    conditionsData.map(async (condition) => {
      const endpointConditionsUrl = `${getZusApiBaseUrl(
        requestContext.env
      )}/fhir/Provenance?target=Condition/${condition.id}`;
      const bundle = await fetch(endpointConditionsUrl, {
        headers: {
          Authorization: `Bearer ${requestContext.authToken}`,
        },
      });
      const conditionsJSON = await bundle.json();

      // The role should be of source otherwise can't be trusted to be provide the correct and truthy binary.
      let documentBinary: fhir4.Binary | undefined;
      if (conditionsJSON.entry) {
        if (conditionsJSON.entry[0].resource.entity) {
          if (conditionsJSON.entry[0].resource.entity[0].role === "source") {
            const binaryID =
              conditionsJSON.entry[0].resource.entity[0].what.reference;

            const endpointBinaryUrl = `${getZusApiBaseUrl(
              requestContext.env
            )}/fhir/${binaryID}`;

            const response = await fetch(endpointBinaryUrl, {
              headers: {
                Authorization: `Bearer ${requestContext.authToken}`,
                accept: "application/json",
                "Content-Type": "application/json+fhir",
              },
            });
            documentBinary = await response.json();
          }
        }
      }

      const documents = {
        xmlBinary: documentBinary || undefined,
        isBinary: documentBinary?.data !== undefined,
      } as BinaryDocumentData;
      binaryObjects.set(condition.id, documents);
    })
  );

  return binaryObjects;
}
