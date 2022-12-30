import { FhirResource, Resource } from "fhir/r4";
import { v4 as uuidv4 } from "uuid";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";
import {
  ASSEMBLER_CODING,
  CREATE_CODING,
  createProvenance,
} from "./provenance";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { getUsersPractitionerReference } from "@/fhir/practitioner";
import { claimsBuilderName } from "@/utils/auth";

export async function createOrEditFhirResource(
  resource: Resource,
  requestContext: CTWRequestContext
) {
  const { fhirClient } = requestContext;
  const resourceModified = resource;

  try {
    if (resource.id) {
      const response = await fhirClient.update({
        resourceType: resource.resourceType,
        id: resource.id,
        body: omitEmptyArrays(resource),
      });
      if (!isFhirError(response)) {
        await createProvenance("UPDATE", response, requestContext);
      }
      return response;
    }
    const response = await fhirClient.create({
      resourceType: resource.resourceType,
      body: omitEmptyArrays(resource),
    });
    if (!isFhirError(response)) {
      resourceModified.id = response.id;
    }
    return response;
  } catch (err) {
    return err;
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
    body: omitEmptyArrays({
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
  await fhirClient.request(
    `${resource.resourceType}/${resource.id}/$meta-delete`,
    {
      method: "POST",
      body: JSON.stringify(post),
      options: { headers: { "content-type": "application/json" } },
    }
  );
}

export async function deleteFhirResource(
  resource: Resource,
  requestContext: CTWRequestContext
) {
  const { fhirClient } = requestContext;

  if (!resource.id) {
    throw new Error(`Tried to delete a resource that hasn't been created yet.`);
  }

  await fhirClient.request(
    `${resource.resourceType}/${resource.id}?_cascade=delete`,
    {
      method: "DELETE",
    }
  );
}
