import { FhirResource } from "fhir-kit-client";
import { Basic } from "fhir/r4";
import { createOrEditFhirResource } from "./action-helper";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import { SYSTEM_BASIC_RESOURCE_TYPE, SYSTEM_ZUS_PROFILE_ACTION } from "./system-urls";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { Telemetry } from "@/utils/telemetry";

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

export async function toggleArchive<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  requestContext: CTWRequestContext
) {
  const existingBasic = model.getLatestBasicResourceByActions(["archive", "unarchive"]);
  const profileAction = model.isArchived ? "unarchive" : "archive";

  await recordProfileAction(existingBasic, model, requestContext, profileAction);
}
