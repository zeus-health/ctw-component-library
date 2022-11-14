import { createOrEditFhirResource } from "@/fhir/action-helper";
import { QUERY_KEY_PATIENT_CONDITIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import Client, { FhirResource } from "fhir-kit-client";

export const onConditionDelete = async (
  resource: fhir4.Condition,
  fhirClient: Client
) => {
  if (!resource.id) {
    throw new Error("Tried to edit a resource that hasn't been created yet.");
  }

  const resourceToDelete = { ...resource };

  if (
    resourceToDelete.verificationStatus &&
    resourceToDelete.verificationStatus.coding
  ) {
    resourceToDelete.verificationStatus.coding[0].code = "entered-in-error";
    // We have to delete clinical status because it may not be present if verification is 'entered-in-error'
    delete resourceToDelete.clinicalStatus;
  }

  const response = (await createOrEditFhirResource(
    resource,
    fhirClient
  )) as FhirResource;

  if (!response.id) {
    throw new Error(`Failed to edit resource with id of ${resource.id}`);
  }

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
};
