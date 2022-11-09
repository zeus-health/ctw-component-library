import { createOrEditFhirResource } from "@/fhir/action-helper";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import Client, { FhirResource } from "fhir-kit-client";
import { Resource } from "fhir/r4";

export const onConditionDelete = async (
  resource: Resource,
  fhirClient: Client
) => {
  if (!resource.id) {
    throw new Error("Tried to edit a resource that hasn't been created yet.");
  }

  const response = (await createOrEditFhirResource(
    resource,
    fhirClient
  )) as FhirResource;

  if (!response.id) {
    throw new Error(`Failed to edit resource with id of ${resource.id}`);
  }

  await Promise.all([
    queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]),
    queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]),
  ]);
};
