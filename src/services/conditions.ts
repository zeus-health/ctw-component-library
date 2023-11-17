import { FhirResource } from "fhir-kit-client";
import { useEffect, useState } from "react";
import { filterResourcesByBuilderId } from "./common";
import { PatientModel } from "..";
import { createOrEditFhirResource } from "../fhir/action-helper";
import {
  SYSTEM_CONDITION_VERIFICATION_STATUS,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_OWNER,
  SYSTEM_ZUS_THIRD_PARTY,
} from "../fhir/system-urls";
import { getLensBuilderId } from "@/api/urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { ConditionModel } from "@/fhir/models/condition";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  ConditionGraphqlResponse,
  conditionsQuery,
  ConditionWithBasics,
} from "@/services/fqs/queries/conditions";
import { cloneDeep, orderBy } from "@/utils/nodash";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientBuilderConditions() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_CONDITIONS,
    [],
    withTimerMetric(fetchPatientBuilderConditionsFQS, "req.timing.builder_conditions")
  );
}

function usePatientSummaryConditions() {
  return useQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    withTimerMetric(fetchPatientSummaryConditionsFQS, "req.timing.summary_conditions")
  );
}

// TODO - once Canvas is no longer using the Patient Conditions Outside component, we can remove this
export function usePatientConditionsOutside() {
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const builderConditionsQuery = usePatientBuilderConditions();
  const summaryConditionsQuery = usePatientSummaryConditions();

  useEffect(() => {
    const builderConditions = builderConditionsQuery.data ?? [];
    const outsideConditions = filterOutsideConditions(
      summaryConditionsQuery.data ?? [],
      builderConditions
    );
    setConditions(outsideConditions);
  }, [builderConditionsQuery.data, summaryConditionsQuery.data]);

  const isLoading = builderConditionsQuery.isLoading || summaryConditionsQuery.isLoading;
  const isError = builderConditionsQuery.isError || summaryConditionsQuery.isError;
  const isFetching = builderConditionsQuery.isFetching || summaryConditionsQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
}

export function usePatientConditionsAll() {
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const builderConditionsQuery = usePatientBuilderConditions();
  const summaryConditionsQuery = usePatientSummaryConditions();

  useEffect(() => {
    const builderConditions = builderConditionsQuery.data ?? [];
    const allConditions = filterOutsideConditions(
      summaryConditionsQuery.data ?? [],
      builderConditions
    );
    allConditions.push(...builderConditions);

    setConditions(allConditions);
  }, [builderConditionsQuery.data, summaryConditionsQuery.data]);

  const isLoading = builderConditionsQuery.isLoading || summaryConditionsQuery.isLoading;
  const isError = builderConditionsQuery.isError || summaryConditionsQuery.isError;
  const isFetching = builderConditionsQuery.isFetching || summaryConditionsQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
}

function setupConditionModelsWithFQS(conditionResources: ConditionWithBasics[]): ConditionModel[] {
  return conditionResources.map((c) => new ConditionModel(c, undefined, c.BasicList));
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

// Filter out summary conditions so that they only include relevant outside conditions where:
//  1. CCS Category code starts with FAC or XXX.
//  2. There is an existing builder-owned condition with a matching known code
//     AND (the outside condition is older than the builder condition OR they
//     have the same status). That is - the builder already knows about this condition in its current state.
export const filterOutsideConditions = (
  summaryConditions: ConditionModel[],
  builderConditions: ConditionModel[]
): ConditionModel[] =>
  summaryConditions.filter((outsideCondition) => {
    if (["FAC", "XXX"].includes(outsideCondition.ccsChapterCode ?? "")) {
      return false;
    }

    return !builderConditions.some((builderCondition) => {
      const otherRecordedDate = outsideCondition.resource.recordedDate;
      const patientRecordedDate = builderCondition.resource.recordedDate;
      const isMatch = outsideCondition.knownCodingsMatch(builderCondition);
      const isEnteredInError = builderCondition.verificationStatus === "entered-in-error";

      const isOlder =
        !otherRecordedDate || (patientRecordedDate && otherRecordedDate <= patientRecordedDate);
      const hasSameStatus = outsideCondition.clinicalStatus === builderCondition.clinicalStatus;

      return isMatch && !isEnteredInError && (isOlder || hasSameStatus);
    });
  });

async function fetchPatientBuilderConditionsFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ConditionGraphqlResponse>(graphClient, conditionsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
      filter: {
        tag: {
          nonematch: [SYSTEM_SUMMARY, `${SYSTEM_ZUS_THIRD_PARTY}`],
          // TODO: There's a bug in FQS that doesn't allow filtering with nonematch AND allmatch.
          // Uncomment the line below once https://zeushealth.atlassian.net/browse/DRT-249 is resolved.
          // allmatch: [`${SYSTEM_ZUS_OWNER}|builder/${requestContext.builderId}`],
        },
      },
    });
    let nodes = data.ConditionConnection.edges.map((x) => x.node);
    // TODO: No longer needed once https://zeushealth.atlassian.net/browse/DRT-249 is resolved.
    nodes = filterResourcesByBuilderId(
      nodes,
      requestContext.contextBuilderId || requestContext.builderId
    );
    let conditions = setupConditionModelsWithFQS(nodes);
    conditions = filterAndSort(conditions);
    Telemetry.histogramMetric(`req.count.builder_conditions`, conditions.length);
    return conditions;
  } catch (e) {
    throw Telemetry.logError(e as Error, `Failed fetching conditions for patient: ${patient.UPID}`);
  }
}

export async function fetchConditionsByIdFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  ids: string[]
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ConditionGraphqlResponse>(graphClient, conditionsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 500,
      sort: {},
      filter: {
        ids: {
          anymatch: ids,
        },
      },
    });
    const nodes = data.ConditionConnection.edges.map((x) => x.node);
    return setupConditionModelsWithFQS(nodes);
  } catch (e) {
    throw Telemetry.logError(e as Error, `Failed fetching conditions for patient: ${patient.UPID}`);
  }
}

async function fetchPatientSummaryConditionsFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ConditionGraphqlResponse>(graphClient, conditionsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
      filter: {
        tag: {
          allmatch: [
            SYSTEM_SUMMARY,
            `${SYSTEM_ZUS_OWNER}|builder/${getLensBuilderId(requestContext.env)}`,
          ],
        },
      },
    });
    const nodes = data.ConditionConnection.edges.map((x) => x.node);
    const conditions = setupConditionModelsWithFQS(nodes);
    const results = filterAndSort(conditions);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.summary_conditions.none", 1);
    }
    Telemetry.histogramMetric("req.count.summary_conditions", results.length);
    return results;
  } catch (e) {
    throw Telemetry.logError(
      e as Error,
      `Failed fetching conditions outside for patient: ${patient.UPID}`
    );
  }
}
