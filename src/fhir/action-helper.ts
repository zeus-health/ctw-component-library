import { OpPatch } from "fhir-kit-client/types/externals";
import { Resource } from "fhir/r4";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";
import { createProvenance } from "./provenance";
import { ResourceTypeString } from "./types";
import { CTWRequestContext } from "@/components/core/ctw-context";

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
