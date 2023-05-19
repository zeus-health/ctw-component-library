import { Basic } from "fhir/r4";
import { FhirResource } from "fhir-kit-client";
import { createOrEditFhirResource } from "./action-helper";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { SYSTEM_BASIC_RESOURCE_TYPE, SYSTEM_ZUS_PROFILE_ACTION } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";
import { useQueryWithPatient } from "..";
import { QUERY_KEY_BASIC } from "@/utils/query-keys";
import { searchCommonRecords } from "./search-helpers";

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

export function useBasic() {
  return useQueryWithPatient(
    QUERY_KEY_BASIC,
    [],
    withTimerMetric(async (requestContext, patient) => {
      try {
        const { resources } = await searchCommonRecords("Basic", requestContext, {
          _tag: `https://zusapi.com/accesscontrol/owner|builder/${requestContext.builderId}`,
        });

        return resources;

        // if (results.length === 0) {
        //   Telemetry.countMetric("req.count.basic.none");
        // }
        // Telemetry.histogramMetric("req.count.basic", results.length);
        // return results;
      } catch (e) {
        throw new Error(`Failed fetching basic information for patient ${patient.UPID}`);
      }
    }, "req.timing.basic")
  );
}

export async function toggleArchive<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  requestContext: CTWRequestContext
) {
  const existingBasic =
    model.getBasicResourceByAction("archive") || model.getBasicResourceByAction("unarchive");
  const profileAction = model.isArchived ? "unarchive" : "archive";

  await recordProfileAction(existingBasic, model, requestContext, profileAction);
}
