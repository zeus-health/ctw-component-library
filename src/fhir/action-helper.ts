import Client from "fhir-kit-client";
import { Resource } from "fhir/r4";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";

export async function createOrEditFhirResource(
  resource: Resource,
  fhirClient: Client
) {
  try {
    if (resource.id) {
      return await fhirClient.update({
        resourceType: resource.resourceType,
        id: resource.id,
        body: omitEmptyArrays(resource),
      });
    }
    return await fhirClient.create({
      resourceType: resource.resourceType,
      body: omitEmptyArrays(resource),
    });
  } catch (err) {
    if (isFhirError(err)) {
      return err;
    }

    throw Error(
      `Failed ${resource.id ? "updating" : "creating"} ${resource.resourceType}`
    );
  }
}
