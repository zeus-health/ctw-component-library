import { Resource } from "fhir/r4";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";
import { createProvenance } from "./provenance";
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
