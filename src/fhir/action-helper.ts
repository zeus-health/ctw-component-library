import { ResourceModel } from "@/models/resource";
import Client from "fhir-kit-client";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";

type CreateOrEditData<T extends ResourceModel> = {
  resourceModel: T;
  fhirClient: Client;
};

export async function createOrEditFhirResource<T extends ResourceModel>({
  resourceModel,
  fhirClient,
}: CreateOrEditData<T>) {
  try {
    if (resourceModel.id) {
      return await fhirClient.update({
        resourceType: resourceModel.resourceType,
        id: resourceModel.id,
        body: omitEmptyArrays(resourceModel.resource) as typeof resourceModel,
      });
    }
    return await fhirClient.create({
      resourceType: resourceModel.resourceType,
      body: omitEmptyArrays(resourceModel.resource) as typeof resourceModel,
    });
  } catch (err) {
    if (isFhirError(err)) {
      return err;
    }

    throw Error(
      `Failed ${resourceModel.id ? "updating" : "creating"} ${
        resourceModel.resourceType
      }`
    );
  }
}
