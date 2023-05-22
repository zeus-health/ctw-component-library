import { Basic, Condition } from "fhir/r4";
import { FhirResource } from "fhir-kit-client";
import { useEffect, useState } from "react";
import { createOrEditFhirResource } from "../../fhir/action-helper";
import { CodePreference } from "../../fhir/codeable-concept";
import {
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_ICD10,
  SYSTEM_ICD10_CM,
  SYSTEM_ICD9,
  SYSTEM_ICD9_CM,
  SYSTEM_SNOMED,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_THIRD_PARTY,
} from "../../fhir/system-urls";
import {
  getAddConditionWithDefaults,
  getClincalAndVerificationStatus,
} from "@/components/content/forms/actions/conditions";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useBasic } from "@/fhir/basic";
import { ConditionModel } from "@/fhir/models/condition";
import { createGraphqlClient, GraphqlConnectionNode, GraphqlPageInfo } from "@/services/fqs/client";
import { conditionsQuery } from "@/services/fqs/queries/conditions";
import { cloneDeep, orderBy } from "@/utils/nodash";
import {
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

export interface ConditionConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Condition>[];
}

export interface ConditionGraphqlResponse {
  ConditionConnection: ConditionConnection;
}

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

export function usePatientBuilderConditions() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_CONDITIONS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const graphClient = createGraphqlClient(requestContext);
        const data = (await graphClient.request(conditionsQuery, {
          upid: patient.UPID,
          cursor: "",
          first: 1000,
          sort: {
            lastUpdated: "DESC",
          },
          filter: {
            tag: {
              nonematch: [SYSTEM_SUMMARY, SYSTEM_ZUS_THIRD_PARTY],
            },
          },
        })) as ConditionGraphqlResponse;

        const nodes = data.ConditionConnection.edges.map((x) => x.node);
        const conditions = setupConditionModelsWithFQS(nodes);
        const results = filterAndSort(conditions);
        Telemetry.histogramMetric("req.count.builder_conditions", results.length);
        return results;
      } catch (e) {
        throw Telemetry.logError(
          e as Error,
          `Failed fetching conditions for patient: ${patient.UPID}`
        );
      }
    }, "req.timing.builder_conditions")
  );
}

function usePatientSummaryConditions() {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const graphClient = createGraphqlClient(requestContext);
        const data = (await graphClient.request(conditionsQuery, {
          upid: patient.UPID,
          cursor: "",
          first: 1000,
          sort: {
            lastUpdated: "DESC",
          },
          filter: {
            tag: {
              allmatch: [SYSTEM_SUMMARY],
            },
          },
        })) as ConditionGraphqlResponse;

        const nodes = data.ConditionConnection.edges.map((x) => x.node);
        const conditions = setupConditionModelsWithFQS(nodes);
        const results = filterAndSort(conditions);
        if (results.length === 0) {
          Telemetry.countMetric("req.count.summary_conditions.none");
        }
        Telemetry.histogramMetric("req.count.summary_conditions", results.length);
        return results;
      } catch (e) {
        throw Telemetry.logError(
          e as Error,
          `Failed fetching conditions outside for patient: ${patient.UPID}`
        );
      }
    }, "req.timing.summary_conditions")
  );
}

export function usePatientConditionsOutside() {
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const patientConditionsQuery = usePatientBuilderConditions();
  const otherConditionsQuery = usePatientSummaryConditions();
  const basicQuery = useBasic();

  useEffect(() => {
    const patientConditions = patientConditionsQuery.data ?? [];
    const basic = basicQuery.data ?? [];
    const otherConditions = filterOtherConditions(
      otherConditionsQuery.data ?? [],
      patientConditions,
      basic,
      true
    );
    setConditions(otherConditions);
  }, [patientConditionsQuery.data, otherConditionsQuery.data, basicQuery.data]);

  const isLoading =
    patientConditionsQuery.isLoading || otherConditionsQuery.isLoading || basicQuery.isLoading;
  const isError =
    patientConditionsQuery.isError || otherConditionsQuery.isError || basicQuery.isError;
  const isFetching =
    patientConditionsQuery.isFetching || otherConditionsQuery.isFetching || basicQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
}

// function setupConditionModels(
//   conditionResources: fhir4.Condition[],
//   bundle: fhir4.Bundle
// ): ConditionModel[] {
//   const basicsMap = getIncludedBasics(bundle);
//   return conditionResources.map((c) => new ConditionModel(c, undefined, basicsMap.get(c.id ?? "")));
// }

function setupConditionModelsWithFQS(conditionResources: fhir4.Condition[]): ConditionModel[] {
  return conditionResources.map((c) => new ConditionModel(c));
}

function filterAndSort(conditions: ConditionModel[]): ConditionModel[] {
  return orderBy(
    conditions.filter((condition) => condition.resource.asserter?.type !== "Patient"),
    ["resource.recordedDate", "display"],
    ["desc"]
  );
}

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

  const response = (await createOrEditFhirResource(clonedResource, requestContext)) as FhirResource;

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
  basic: Basic[],
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
      const isEnteredInError = patientCondition.verificationStatus === "entered-in-error";

      const isOlder =
        !otherRecordedDate || (patientRecordedDate && otherRecordedDate <= patientRecordedDate);
      const hasSameStatus = otherCondition.clinicalStatus === patientCondition.clinicalStatus;

      return isMatch && !isEnteredInError && (isOlder || hasSameStatus);
    });
  });
