import Client from "fhir-kit-client";
import { Resource } from "fhir/r4";
import { omitEmptyArrays } from "./client";

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
      resourceType: "foo",
      body: omitEmptyArrays(resource),
    });
  } catch (err) {
    return err;
  }
}
