import { FhirResource, Resource } from "fhir/r4";
import { v4 as uuidv4 } from "uuid";
import { fixupFHIR } from "./client";
import { isFhirError } from "./errors";
import { ASSEMBLER_CODING, CREATE_CODING, createProvenance } from "./provenance";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { getUsersPractitionerReference } from "@/fhir/practitioner";
import { claimsBuilderName } from "@/utils/auth";
import { Telemetry } from "@/utils/telemetry";

type ResourceSaveStatus = "update" | "create" | "failure";
export type OnResourceSaveCallback = (
  resource: Resource,
  action: ResourceSaveStatus
) => void;

export async function createOrEditFhirResource(
  resource: Resource,
  requestContext: CTWRequestContext
) {
  const { fhirClient, fhirWriteBackClient } = requestContext;
  const resourceModified = resource;
  let action: ResourceSaveStatus = "create";
  let response;

  try {
    if (resource.id) {
      action = "update";
      // Use the ODS client to update a resource
      response = await fhirClient.update({
        resourceType: resource.resourceType,
        id: resource.id,
        body: fixupFHIR(resource),
      });
      if (!isFhirError(response)) {
        await createProvenance("UPDATE", response, requestContext);
      }
    } else {
      // Utilize the FHIR write-back client for creating resources
      response = await fhirWriteBackClient.create({
        resourceType: resource.resourceType,
        body: fixupFHIR(resource),
      });
      if (!isFhirError(response)) {
        resourceModified.id = response.id;
      }
    }
    Telemetry.reportActionSuccess(`${resource.resourceType}.${action}`);
    return response;
  } catch (err) {
    action = "failure";
    Telemetry.reportActionFailure(`${resource.resourceType}.${action}`);
    Telemetry.logError(err as Error);
    return err;
  } finally {
    requestContext.onResourceSave(resourceModified, action);
  }
}

export async function createFhirResourceWithProvenance(
  resource: FhirResource,
  requestContext: CTWRequestContext
) {
  const { fhirClient } = requestContext;
  const builderName = claimsBuilderName(requestContext.authToken);
  const resourceId = resource.id || uuidv4();
  const provenanceFullUrl = uuidv4();

  const bundle: fhir4.Bundle = {
    resourceType: "Bundle",
    type: "transaction",
    entry: [
      {
        request: {
          method: "POST",
          url: resource.resourceType,
        },
        fullUrl: resourceId,
        resource,
      },
      {
        request: {
          method: "POST",
          url: "Provenance",
        },
        fullUrl: provenanceFullUrl,
        resource: {
          resourceType: "Provenance",
          activity: CREATE_CODING,
          agent: [
            {
              who: await getUsersPractitionerReference(requestContext),
              onBehalfOf: { display: builderName },
            },
            {
              type: {
                coding: [ASSEMBLER_CODING],
              },
              who: { display: "Zus Health" },
            },
          ],
          recorded: new Date().toISOString(),
          target: [
            {
              reference: `${resource.resourceType}/${resourceId}`,
              type: resource.resourceType,
            },
          ],
        },
      },
    ],
  };

  return fhirClient.transaction({
    body: fixupFHIR({
      ...bundle,
      type: "transaction",
    }),
  });
}

export async function deleteMetaTags(
  resource: Resource,
  requestContext: CTWRequestContext,
  tag: fhir4.Coding[]
) {
  const post = {
    resourceType: "Parameters",
    parameter: [
      {
        name: "meta",
        valueMeta: {
          tag,
        },
      },
    ],
  };

  const { fhirClient } = requestContext;
  await fhirClient.request(`${resource.resourceType}/${resource.id}/$meta-delete`, {
    method: "POST",
    body: JSON.stringify(post),
    options: { headers: { "content-type": "application/json" } },
  });
}

export async function deleteFhirResource(resource: Resource, requestContext: CTWRequestContext) {
  const { fhirClient } = requestContext;

  if (!resource.id) {
    throw new Error(`Tried to delete a resource that hasn't been created yet.`);
  }

  await fhirClient.request(`${resource.resourceType}/${resource.id}?_cascade=delete`, {
    method: "DELETE",
  });
}
