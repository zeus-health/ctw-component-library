import { FhirResource } from "fhir-kit-client";
import { CTWRequestContext } from "../core/providers/ctw-context";
import { createOrEditFhirResource } from "@/fhir/action-helper";
import { recordProfileAction } from "@/fhir/basic";
import { ConditionModel } from "@/fhir/models";
import { SYSTEM_CONDITION_VERIFICATION_STATUS } from "@/fhir/system-urls";
import { cloneDeep } from "@/utils/nodash";
import {
  QUERY_KEY_OTHER_PROVIDER_CONDITIONS,
  QUERY_KEY_PATIENT_CONDITIONS,
} from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export const onConditionDelete = async (
  resource: fhir4.Condition,
  requestContext: CTWRequestContext
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

export const toggleArchive = async (
  condition: ConditionModel,
  requestContext: CTWRequestContext
) => {
  const existingBasic =
    condition.getBasicResourceByAction("archive") ||
    condition.getBasicResourceByAction("unarchive");
  const profileAction = condition.isArchived ? "unarchive" : "archive";

  await recordProfileAction(
    existingBasic,
    condition,
    requestContext,
    profileAction
  );

  // Refresh our data (this is really just needed to update
  // otherProviderRecord state).
  await queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_CONDITIONS]);
};
