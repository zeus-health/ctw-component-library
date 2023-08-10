import { UseQueryResult } from "@tanstack/react-query";
import { Basic } from "fhir/r4";
import { FhirResource } from "fhir-kit-client";
import { useEffect, useState } from "react";
import { createOrEditFhirResource } from "./action-helper";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { searchCommonRecords } from "./search-helpers";
import { SYSTEM_BASIC_RESOURCE_TYPE, SYSTEM_ZUS_PROFILE_ACTION } from "./system-urls";
import { useQueryWithPatient } from "..";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { FeatureToggle } from "@/hooks/use-feature-toggle";
import { cloneDeep } from "@/utils/nodash";
import { QUERY_KEY_BASIC } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export async function recordProfileAction<T extends fhir4.Resource>(
  existingBasic: Basic | undefined,
  model: FHIRModel<T>,
  requestContext: CTWRequestContext,
  profileAction: string
) {
  if (!model.id) {
    throw new Error(`Tried to ${profileAction} a resource that hasn't been created yet.`);
  }

  if (model.ownedByBuilder(requestContext.builderId)) {
    throw new Error(`Tried to ${profileAction} a patient record resource.`);
  }

  const basic: fhir4.Basic = {
    resourceType: "Basic",
    id: existingBasic?.id,
    code: {
      coding: [
        {
          system: SYSTEM_BASIC_RESOURCE_TYPE,
          code: "adminact",
          display: "Administrative Activity",
        },
        {
          system: SYSTEM_ZUS_PROFILE_ACTION,
          code: profileAction,
        },
      ],
    },
    subject: {
      reference: `${model.resourceType}/${model.id}`,
      type: model.resourceType,
    },
    author: await getUsersPractitionerReference(requestContext),
  };

  const response = (await createOrEditFhirResource(basic, requestContext)) as FhirResource;

  if (!response.id) {
    Telemetry.reportActionFailure(profileAction);
    throw new Error(`Failed to ${profileAction} resource with id of ${model.id}`);
  } else {
    Telemetry.reportActionSuccess(profileAction);
  }
}

export function useBasic(fqs: FeatureToggle) {
  return useQueryWithPatient(
    QUERY_KEY_BASIC,
    [fqs.ready, fqs.enabled],
    (() => {
      if (!fqs.ready) {
        return async () =>
          new Promise<Basic[]>((resolve) => {
            resolve([]);
          });
      }
      return fqs.enabled
        ? withTimerMetric(fetchBasic, "req.timing.basic")
        : // Don't fetch Basic resources if FQS is disabled; the Outside Conditions/Meds ODS queries already fetch them via _revinclude.
          async () =>
            new Promise<Basic[]>((resolve) => {
              resolve([]);
            });
    })()
  );
}

function mapBasics<R extends fhir4.Resource, T extends FHIRModel<R>>(
  queryData: T[],
  basicsData: Basic[]
) {
  const resources = cloneDeep(queryData);
  // If basic data came back from the above useBasic call, manually map any basic data to the resources
  // it corresponds to.
  if (basicsData.length > 0) {
    resources.forEach((a, i) => {
      const filteredBasics = basicsData.filter(
        (b) => b.subject?.reference === `${a.resourceType}/${a.id}`
      );
      resources[i].revIncludes = filteredBasics;
    });
  }
  return resources;
}

export function useIncludeBasics<R extends fhir4.Resource, T extends FHIRModel<R>>(
  query: UseQueryResult<T[]>,
  fqs: FeatureToggle
) {
  const basicsQuery = useBasic(fqs);
  const initialResources = mapBasics(query.data || [], basicsQuery.data || []);
  const [resources, setResources] = useState<T[]>(initialResources);

  useEffect(() => {
    const resources2 = mapBasics(query.data || [], basicsQuery.data || []);
    setResources([...resources2]); // spread syntax here needed to make sure the array is a new reference in order to trigger a re-render
  }, [basicsQuery.data, query.data]);

  const isLoading = query.isLoading || basicsQuery.isLoading;
  const isError = query.isError || basicsQuery.isError;
  const isFetching = query.isFetching || basicsQuery.isFetching || !fqs.ready;
  const isFetched = query.isFetched && basicsQuery.isFetched;

  return {
    isLoading,
    isError,
    isFetching,
    isFetched,
    data: resources,
  };
}

export async function toggleDismiss<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  requestContext: CTWRequestContext
) {
  const existingBasic = model.getLatestBasicResourceByActions(["archive", "unarchive"]);
  const profileAction = model.isDismissed ? "unarchive" : "archive";
  model.optimisticToggleIsDismiss();
  await recordProfileAction(existingBasic, model, requestContext, profileAction);
}

export async function toggleRead<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  requestContext: CTWRequestContext
) {
  const existingBasic = model.getLatestBasicResourceByActions(["read", "unread"]);
  const profileAction = model.isRead ? "unread" : "read";
  model.optimisticToggleIsRead();
  await recordProfileAction(existingBasic, model, requestContext, profileAction);
}

async function fetchBasic(requestContext: CTWRequestContext) {
  try {
    const { resources } = await searchCommonRecords("Basic", requestContext, {
      _tag: `https://zusapi.com/accesscontrol/owner|builder/${requestContext.builderId}`,
    });
    if (resources.length === 0) {
      Telemetry.countMetric("req.count.basic.none");
    }
    Telemetry.histogramMetric("req.count.basic", resources.length);
    return resources;
  } catch (e) {
    throw new Error(`Failed fetching basic resources for builder ${requestContext.builderId}`);
  }
}
