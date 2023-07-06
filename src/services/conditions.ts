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
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useBasic } from "@/fhir/basic";
import { getIncludedBasics } from "@/fhir/bundle";
import { ConditionModel } from "@/fhir/models/condition";
import { searchBuilderRecords, searchSummaryRecords } from "@/fhir/search-helpers";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { ConditionGraphqlResponse, conditionsQuery } from "@/services/fqs/queries/conditions";
import { cloneDeep, orderBy } from "@/utils/nodash";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { Telemetry } from "@/utils/telemetry";

export function usePatientBuilderConditions() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_CONDITIONS,
    [],
    "conditions",
    "req.timing.builder_conditions",
    fetchPatientBuilderConditionsFQS,
    fetchPatientBuilderConditionsODS
  );
}

function usePatientSummaryConditions() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
    [],
    "conditions",
    "req.timing.summary_conditions",
    fetchPatientSummaryConditionsFQS,
    fetchPatientSummaryConditionsODS
  );
}

export function usePatientConditionsOutside() {
  const fqs = useFQSFeatureToggle("conditions");
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const builderConditionsQuery = usePatientBuilderConditions();
  const summaryConditionsQuery = usePatientSummaryConditions();

  // This query is a noop when FQS is disabled and will just return an empty list of basic resources.
  const basicQuery = useBasic(fqs);

  useEffect(() => {
    const builderConditions = builderConditionsQuery.data ?? [];
    const basics = basicQuery.data ?? [];
    const outsideConditions = filterOtherConditions(
      summaryConditionsQuery.data ?? [],
      builderConditions
    );
    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      outsideConditions.forEach((c, i) => {
        const filteredBasics = basics.filter((b) => b.subject?.reference === `Condition/${c.id}`);
        outsideConditions[i].revIncludes = filteredBasics;
      });
    }
    setConditions(outsideConditions);
  }, [builderConditionsQuery.data, summaryConditionsQuery.data, basicQuery.data]);

  const isLoading =
    builderConditionsQuery.isLoading || summaryConditionsQuery.isLoading || basicQuery.isLoading;
  const isError =
    builderConditionsQuery.isError || summaryConditionsQuery.isError || basicQuery.isError;
  const isFetching =
    builderConditionsQuery.isFetching ||
    summaryConditionsQuery.isFetching ||
    basicQuery.isFetching ||
    !fqs.ready;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
}

export function usePatientConditionsAll() {
  const fqs = useFQSFeatureToggle("conditions");
  const [conditions, setConditions] = useState<ConditionModel[]>([]);
  const builderConditionsQuery = usePatientBuilderConditions();
  const summaryConditionsQuery = usePatientSummaryConditions();

  // This query is a noop when FQS is disabled and will just return an empty list of basic resources.
  const basicQuery = useBasic(fqs);

  useEffect(() => {
    const builderConditions = builderConditionsQuery.data ?? [];
    const basics = basicQuery.data ?? [];
    const outsideConditions = filterAndMergeConditions(
      summaryConditionsQuery.data ?? [],
      builderConditions
    );
    // If basic data came back from the above useBasic call, manually map any basic data to the condition
    // it corresponds to.
    if (basics.length > 0) {
      outsideConditions.forEach((c, i) => {
        const filteredBasics = basics.filter((b) => b.subject?.reference === `Condition/${c.id}`);
        outsideConditions[i].revIncludes = filteredBasics;
      });
    }
    setConditions(outsideConditions);
  }, [builderConditionsQuery.data, summaryConditionsQuery.data, basicQuery.data]);

  const isLoading =
    builderConditionsQuery.isLoading || summaryConditionsQuery.isLoading || basicQuery.isLoading;
  const isError =
    builderConditionsQuery.isError || summaryConditionsQuery.isError || basicQuery.isError;
  const isFetching =
    builderConditionsQuery.isFetching ||
    summaryConditionsQuery.isFetching ||
    basicQuery.isFetching ||
    !fqs.ready;

  return {
    isLoading,
    isError,
    isFetching,
    data: conditions,
  };
}

function setupConditionModels(
  conditionResources: fhir4.Condition[],
  bundle: fhir4.Bundle
): ConditionModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return conditionResources.map((c) => new ConditionModel(c, undefined, basicsMap.get(c.id ?? "")));
}

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
//  1. CCS Category code starts with FAC or XXX.
//  2. There is an existing builder-owned condition with a matching known code
//     AND (the outside condition is older than the builder condition OR they
//     have the same status).
export const filterOtherConditions = (
  outsideConditions: ConditionModel[],
  builderConditions: ConditionModel[]
): ConditionModel[] =>
  outsideConditions.filter((outsideCondition) => {
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

// TODO - comment explaining why this is needed
export const filterAndMergeConditions = (
  outsideConditions: ConditionModel[],
  builderConditions: ConditionModel[]
): ConditionModel[] => {
  const conditions = outsideConditions.filter((outsideCondition) => {
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

  conditions.push(...builderConditions);

  return conditions;
};

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
    Telemetry.histogramMetric(`req.count.builder_conditions`, conditions.length, ["fqs"]);
    return conditions;
  } catch (e) {
    throw Telemetry.logError(e as Error, `Failed fetching conditions for patient: ${patient.UPID}`);
  }
}

async function fetchPatientBuilderConditionsODS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const { bundle, resources: conditions } = await searchBuilderRecords(
      "Condition",
      requestContext,
      {
        patientUPID: patient.UPID,
      }
    );
    const results = filterAndSort(setupConditionModels(conditions, bundle));
    Telemetry.histogramMetric("req.count.builder_conditions", results.length);
    return results;
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
      Telemetry.countMetric("req.count.summary_conditions.none", 1, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.summary_conditions", results.length, ["fqs"]);
    return results;
  } catch (e) {
    throw Telemetry.logError(
      e as Error,
      `Failed fetching conditions outside for patient: ${patient.UPID}`
    );
  }
}

async function fetchPatientSummaryConditionsODS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const { bundle, resources: conditions } = await searchSummaryRecords(
      "Condition",
      requestContext,
      {
        _revinclude: "Basic:subject",
        patientUPID: patient.UPID,
      }
    );
    const results = filterAndSort(setupConditionModels(conditions, bundle));
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
}
