import { FhirResource } from "fhir-kit-client";
import { Basic } from "fhir/r4";
import { filter } from "lodash";
import { createOrEditFhirResource, deleteMetaTags } from "./action-helper";
import { FHIRModel } from "./models/fhir-model";
import { getUsersPractitionerReference } from "./practitioner";
import {
  SYSTEM_BASIC_RESOURCE_TYPE,
  SYSTEM_ZUS_PROFILE_ACTION,
} from "./system-urls";
import { CTWRequestContext } from "@/components/core/ctw-context";

export async function recordProfileAction<T extends fhir4.Resource>(
  existingBasic: Basic | undefined,
  model: FHIRModel<T>,
  requestContext: CTWRequestContext,
  profileAction: string
) {
  if (!model.id) {
    throw new Error(
      `Tried to ${profileAction} a resource that hasn't been created yet.`
    );
  }

  if (!model.isSummaryResource) {
    throw new Error(`Tried to ${profileAction} a patient record resource.`);
  }

  // First remove existing profile action meta tag first.
  // We have to do this using special $meta-delete, otherwise
  // meta tags get merged.
  if (existingBasic) {
    const tags = filter(existingBasic.meta?.tag, {
      system: SYSTEM_ZUS_PROFILE_ACTION,
    });
    await deleteMetaTags(existingBasic, requestContext, tags);
  }

  const basic: fhir4.Basic = {
    resourceType: "Basic",
    id: existingBasic?.id,
    meta: {
      tag: [
        {
          system: SYSTEM_ZUS_PROFILE_ACTION,
          code: profileAction,
        },
      ],
    },
    code: {
      coding: [
        {
          system: SYSTEM_BASIC_RESOURCE_TYPE,
          code: "adminact",
          display: "Administrative Activity",
        },
      ],
      text: "Administrative Activity",
    },
    subject: {
      reference: `${model.resourceType}/${model.id}`,
      type: model.resourceType,
    },
    author: await getUsersPractitionerReference(requestContext),
  };

  const response = (await createOrEditFhirResource(
    basic,
    requestContext
  )) as FhirResource;

  if (!response.id) {
    throw new Error(
      `Failed to ${profileAction} resource with id of ${model.id}`
    );
  }
}
