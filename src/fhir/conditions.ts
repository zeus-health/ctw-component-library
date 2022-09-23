import { ConditionModel } from "@/models/conditions";
import type { QueryFunction } from "@tanstack/query-core";
import { QueryFunctionContext } from "@tanstack/react-query";
import Client from "fhir-kit-client";
import { sortBy } from "lodash";

import {
  flattenArrayFilters,
  searchBuilderRecords,
  searchCommonRecords,
  searchLensRecords,
} from "./search-helpers";

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

export type QueryKeyConfirmedConditions = [string, string, ConditionFilters];
export type QueryKeyLensConditions = [string, string];

export type ConfirmedConditions = QueryFunction & {
  queryKey: QueryFunctionContext<[string, string, ConditionFilters]>;
  meta: { current: Client };
};

export async function getConfirmedConditions(
  queryParams: QueryFunctionContext<QueryKeyConfirmedConditions>
) {
  const { meta, queryKey } = queryParams;
  let fhirClient;

  if (meta?.current) {
    fhirClient = meta.current as Client;
  }

  if (!fhirClient) {
    throw Error("Fhir Client is required");
  }
  const [_, patientUPID, conditionFilters] = queryKey;
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

export type LensConditions = {
  queryKey: [string, string];
  meta: { current: Client };
};

export async function getLensConditions(
  queryParams: QueryFunctionContext<QueryKeyLensConditions>
) {
  const { meta, queryKey } = queryParams;
  let fhirClient;

  if (meta?.current) {
    fhirClient = meta.current as Client;
  }

  if (!fhirClient) {
    throw Error("Fhir Client is required");
  }

  const [_, patientUPID] = queryKey;
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
  fhirClient: Client,
  patientUPID: string
) {
  try {
    const { resources: conditions } = await searchCommonRecords(
      "Condition",
      fhirClient,
      {
        patientUPID,
        _include: ["Condition:patient", "Condition:encounter"],
      }
    );
    return conditions;
  } catch (e) {
    throw new Error(
      `Failed fetching condition history information for patient: ${e}`
    );
  }
}

function filterAndSort(conditions: fhir4.Condition[]) {
  return sortBy(
    conditions.filter((condition) => condition.asserter?.type !== "Patient"),
    (condition) => new ConditionModel(condition).display
  );
}
