import Client from "fhir-kit-client";
import { omitEmptyArrays } from "./client";
import { isFhirError } from "./errors";

export interface FhirResourceBase {
  id: string | undefined;
  resourceType: string;
  resource: fhir4.Condition;
}

type CreateOrEditData<T extends FhirResourceBase> = {
  resourceModel: T;
  getCTWFhirClient: () => Promise<Client>;
};

export async function createOrEditFhirResource<T extends FhirResourceBase>({
  resourceModel,
  getCTWFhirClient,
}: CreateOrEditData<T>) {
  const fhirClient = await getCTWFhirClient();
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

    throw Error("Failed saving error");
  }
}
