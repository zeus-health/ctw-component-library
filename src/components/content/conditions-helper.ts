import { createOrEditFhirResource } from "@/fhir/action-helper";
import { SYSTEM_CONDITION_VERIFICATION_STATUS } from "@/fhir/system-urls";
import { QUERY_KEY_PATIENT_CONDITIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import Client, { FhirResource } from "fhir-kit-client";
import { cloneDeep } from "lodash";

export const onConditionDelete = async (
  resource: fhir4.Condition,
  fhirClient: Client
) => {
  if (!resource.id) {
    throw new Error("Tried to edit a resource that hasn't been created yet.");
  }

  const clonedResource = cloneDeep(resource);

  clonedResource.verificationStatus = {
    coding: [
      {
        code: "entered-in-error",
        system: SYSTEM_CONDITION_VERIFICATION_STATUS,
      },
    ],
  };
  delete clonedResource.clinicalStatus;

  const response = (await createOrEditFhirResource(
    clonedResource,
    fhirClient
  )) as FhirResource;

  if (!response.id) {
    throw new Error(`Failed to edit resource with id of ${resource.id}`);
  }

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
};
