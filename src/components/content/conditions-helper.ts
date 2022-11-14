import { createOrEditFhirResource } from "@/fhir/action-helper";
import { SYSTEM_CONDITION_VERIFICATION_STATUS } from "@/fhir/system-urls";
import { QUERY_KEY_PATIENT_CONDITIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";
import { FhirResource } from "fhir-kit-client";
import { cloneDeep } from "lodash";
import { CTWRequestContext } from "../core/ctw-context";

export const onConditionDelete = async (
  resource: fhir4.Condition,
  requestContext: CTWRequestContext
) => {
  const client = requestContext.fhirClient;
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
  // We have to delete clinical status because it can't be present if verification is 'entered-in-error'
  delete clonedResource.clinicalStatus;

  const response = (await createOrEditFhirResource(
    clonedResource,
    requestContext
  )) as FhirResource;

  if (!response.id) {
    throw new Error(`Failed to edit resource with id of ${resource.id}`);
  }

  await queryClient.invalidateQueries([QUERY_KEY_PATIENT_CONDITIONS]);
};
