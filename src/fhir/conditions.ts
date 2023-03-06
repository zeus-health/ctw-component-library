import { FhirResource, SearchParams } from "fhir-kit-client";
import { useEffect, useState } from "react";
import { createOrEditFhirResource } from "./action-helper";
import { recordProfileAction } from "./basic";
import { getIncludedBasics } from "./bundle";
import { CodePreference } from "./codeable-concept";
import {
  searchBuilderRecords,
  searchCommonRecords,
  searchSummaryRecords,
} from "./search-helpers";
import {
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED,
} from "./system-urls";
import {
  getAddConditionWithDefaults,
  getClincalAndVerificationStatus,
} from "@/components/content/forms/actions/conditions";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
import { cloneDeep, compact, orderBy } from "@/utils/nodash";
import {
  QUERY_KEY_CONDITION_HISTORY,
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

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
    withTimerMetric(async (requestContext, patient) => {
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
    }, "req.patient_conditions")
  );
}

function usePatientConditionsOutsideDuped() {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    withTimerMetric(async (requestContext, patient) => {
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
    }, "req.other_provider_conditions")
  );
}

export function usePatientConditionsOutside() {
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const patientConditionsQuery = usePatientConditions();
  const otherConditionsQuery = usePatientConditionsOutsideDuped();

  useEffect(() => {
    const patientConditions = patientConditionsQuery.data ?? [];
    const otherConditions = filterOtherConditions(
      otherConditionsQuery.data ?? [],
      patientConditions,
      true
    );
    setConditions(otherConditions);
  }, [patientConditionsQuery.data, otherConditionsQuery.data]);

  const isLoading =
    patientConditionsQuery.isLoading || otherConditionsQuery.isLoading;
  const isError =
    patientConditionsQuery.isError || otherConditionsQuery.isError;
  const isFetching =
    patientConditionsQuery.isFetching || otherConditionsQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
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
    withTimerMetric(async (requestContext, patient) => {
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
    }, "req.condition_history"),
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

export const toggleArchive = async (
  condition: ConditionModel,
  requestContext: CTWRequestContext
) => {
  const existingBasic =
    condition.getBasicResourceByAction("archive") ||
    condition.getBasicResourceByAction("unarchive");
  const profileAction = condition.isArchived ? "unarchive" : "archive";

  await recordProfileAction(
    existingBasic,
    condition,
    requestContext,
    profileAction
  );

  // Refresh our data (this is really just needed to update
  // otherProviderRecord state).
  await queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]);
};

export const deleteCondition = async (
  resource: fhir4.Condition,
  requestContext: CTWRequestContext
) => {
  if (!resource.id) {
    throw new Error("Tried to edit a resource that hasn't been created yet.");
  }

  const clonedResource = cloneDeep(resource);

  clonedResource.verificationStatus = {
    coding: [
      {
        code: "entered-in-error",
        system: SYSTEM_CONDITION_VERIFICATION_STATUS,
      },
    ],
  };
  // We have to delete clinical status because it can't be present if verification is 'entered-in-error'
  delete clonedResource.clinicalStatus;

  const response = (await createOrEditFhirResource(
    clonedResource,
    requestContext
  )) as FhirResource;

  if (!response.id) {
    Telemetry.reportActionFailure("delete_condition");
    throw new Error(`Failed to edit resource with id of ${resource.id}`);
  } else {
    Telemetry.reportActionSuccess("delete_condition");
  }

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
};

// Filter out other conditions where:
//  1. Condition is archived and includeArchived is false.
//  2. CCS Category code starts with FAC or XXX.
//  3. There is an existing patient condition with a matching known code.
//     AND The other condition is older than the patient condition OR they
//     have the same status.
export const filterOtherConditions = (
  otherConditions: ConditionModel[],
  patientConditions: ConditionModel[],
  includeArchived: boolean
): ConditionModel[] =>
  otherConditions.filter((otherCondition) => {
    if (otherCondition.isArchived && !includeArchived) return false;

    if (["FAC", "XXX"].includes(otherCondition.ccsChapterCode ?? "")) {
      return false;
    }

    return !patientConditions.some((patientCondition) => {
      const otherRecordedDate = otherCondition.resource.recordedDate;
      const patientRecordedDate = patientCondition.resource.recordedDate;
      const isMatch = otherCondition.knownCodingsMatch(patientCondition);
      const isEnteredInError =
        patientCondition.verificationStatus === "entered-in-error";

      const isOlder =
        !otherRecordedDate ||
        (patientRecordedDate && otherRecordedDate <= patientRecordedDate);
      const hasSameStatus =
        otherCondition.clinicalStatus === patientCondition.clinicalStatus;

      return isMatch && !isEnteredInError && (isOlder || hasSameStatus);
    });
  });
