import { Basic } from "fhir/r4";
import { FhirResource } from "fhir-kit-client";
import { createOrEditFhirResource } from "./action-helper";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { searchCommonRecords } from "./search-helpers";
import { SYSTEM_BASIC_RESOURCE_TYPE, SYSTEM_ZUS_PROFILE_ACTION } from "./system-urls";
import { useQueryWithPatient } from "..";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
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

  if (!model.isSummaryResource) {
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

export function useBasic(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_BASIC,
    [],
    enableFQS
      ? withTimerMetric(fetchBasic, "req.timing.basic")
      : // Don't fetch Basic resources if FQS is disabled; the Outside Conditions/Meds ODS queries already fetch them via _revinclude.
        async () =>
          new Promise<Basic[]>((resolve) => {
            resolve([]);
          })
  );
}

export async function toggleArchive<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  requestContext: CTWRequestContext
) {
  const existingBasic = model.getLatestBasicResourceByActions(["archive", "unarchive"]);
  const profileAction = model.isArchived ? "unarchive" : "archive";

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
