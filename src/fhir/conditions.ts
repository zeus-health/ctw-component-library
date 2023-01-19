import { SearchParams } from "fhir-kit-client";
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
import { getZusApiBaseUrl } from "@/api/urls";
import {
  getAddConditionWithDefaults,
  getClincalAndVerificationStatus,
} from "@/components/content/forms/actions/conditions";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
import { compact, find, orderBy } from "@/utils/nodash";
import {
  QUERY_KEY_CONDITION_HISTORY,
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

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
    ...getClincalAndVerificationStatus("Active"),
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
        Telemetry.logError(e as Error, "Failed fetching condition information");
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
        Telemetry.logError(
          e as Error,
          `Failed fetching condition information for patient: ${e}`
        );
        throw new Error(
          `Failed fetching condition information for patient: ${e}`
        );
      }
    }
  );
}

const historyRequestTemplate = (id: string) => ({
  request: {
    method: "GET",
    url: `/Condition/${id}/_history`,
  },
});

export const getConditionVersionHistory = async (
  requestContext: CTWRequestContext,
  searchParams: SearchParams
) => {
  const response = await searchBuilderRecords(
    "Condition",
    requestContext,
    searchParams
  );

  const builderIds = response.resources.map(
    // The only time that a resource does not have an id is when it is being submitted to the server using a create operation.
    (resource) => resource.id
  ) as string[];

  if (!builderIds.length) {
    return undefined;
  }

  const bundle: fhir4.Bundle = {
    resourceType: "Bundle",
    id: "bundle-history-conditions",
    type: "batch",
    entry: builderIds.map((id) =>
      historyRequestTemplate(id)
    ) as fhir4.BundleEntry<fhir4.FhirResource>[],
  };

  return requestContext.fhirClient.batch({
    body: {
      ...bundle,
      type: "batch",
    },
  });
};

export function useConditionHistory(condition?: ConditionModel) {
  return useQueryWithPatient(
    QUERY_KEY_CONDITION_HISTORY,
    [condition],
    async (requestContext, patient) => {
      if (!condition) {
        return undefined;
      }
      if (condition.verificationStatus === "entered-in-error") {
        return {
          conditions: [],
          bundle: { resourceType: "Bundle", entry: [] },
        };
      }
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

        const versionHistoryBundle = await getConditionVersionHistory(
          requestContext,
          searchParams
        );

        const conditionVersions: fhir4.BundleEntry[] = [];
        if (versionHistoryBundle && versionHistoryBundle.entry) {
          versionHistoryBundle.entry.forEach(
            (bundleEntry: fhir4.BundleEntry) => {
              const { resource } = bundleEntry;
              if (resource?.resourceType === "Bundle" && resource.entry) {
                conditionVersions.push(...resource.entry);
              }
            }
          );
        }

        const combinedConditions = conditions.concat(
          ...(compact(
            conditionVersions.map((r) => r.resource)
          ) as fhir4.Condition[])
        );

        return {
          conditions: combinedConditions,
          bundle,
        };
      } catch (e) {
        Telemetry.logError(
          e as Error,
          "Failed fetching condition history information for patient"
        );
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
    (c) => new ConditionModel(c, undefined, basicsMap.get(c.id ?? ""))
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

export async function getBinaryDocument(
  requestContext: CTWRequestContext,
  binaryId: string
) {
  const { env, authToken } = requestContext;
  const endpointBinaryUrl = `${getZusApiBaseUrl(env)}/fhir/${binaryId}`;

  const response = await fetch(endpointBinaryUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      accept: "application/json",
      "Content-Type": "application/json+fhir",
    },
  });
  return response.json();
}

export async function getProvenanceForConditions(
  requestContext: CTWRequestContext,
  conditionsData: ConditionModel[]
) {
  const data = await Promise.all(
    conditionsData.map(async (condition) => {
      const endpointConditionsUrl = `${getZusApiBaseUrl(
        requestContext.env
      )}/fhir/Provenance?target=Condition/${condition.id}`;
      const bundle = await fetch(endpointConditionsUrl, {
        headers: {
          Authorization: `Bearer ${requestContext.authToken}`,
        },
      });
      return bundle.json();
    })
  );

  return data;
}

export function getBinaryId(
  provenanceBundles: fhir4.Bundle[],
  targetConditionId: string
): string | undefined {
  let binaryId;

  provenanceBundles.forEach((bundle) => {
    if (bundle.entry) {
      const link = find(bundle.link, { relation: "self" });
      if (link) {
        const decodedUrl = decodeURIComponent(link.url).split("/");
        const conditionId = decodedUrl[decodedUrl.length - 1];

        const binaryElem = retrieveBinaryDocumentElement(
          bundle.entry,
          conditionId,
          targetConditionId
        ) as fhir4.BundleEntry<fhir4.Provenance> | undefined;
        if (binaryElem && binaryElem.resource?.entity) {
          binaryId = binaryElem.resource.entity[0].what.reference;
        }
      }
    }
  });
  return binaryId;
}

const retrieveBinaryDocumentElement = (
  bundleEntry: fhir4.BundleEntry<fhir4.FhirResource>[],
  conditionId: string,
  targetConditionId: string
) =>
  bundleEntry.find((entry) => {
    if (
      entry.resource?.resourceType === "Provenance" &&
      entry.resource.entity
    ) {
      const hasDocument = entry.resource.entity[0].role === "source";
      const idMatch = conditionId === targetConditionId;
      return idMatch && hasDocument;
    }
    return false;
  });
