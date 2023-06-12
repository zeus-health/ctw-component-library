import { Resource } from "fhir/r4";
import { fixupFHIR } from "./client";
import { isFhirError } from "./errors";
import { createProvenance } from "./provenance";
import { isFHIRDomainResource } from "./types";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { longPollFQS } from "@/services/fqs/long-poll-fqs";
import { Telemetry } from "@/utils/telemetry";

type ResourceSaveOperation = "update" | "create";
export type OnResourceSaveCallback = (
  resource: Resource,
  action: ResourceSaveOperation,
  error?: Error
) => void;

export async function createOrEditFhirResource(
  resource: Resource,
  requestContext: CTWRequestContext
) {
  const { fhirClient, fhirWriteBackClient } = requestContext;
  const resourceModified = resource;
  let action: ResourceSaveOperation = "create";
  let response;

  try {
    if (resource.id) {
      action = "update";
      // Use the ODS client to update a resource
      response = await fhirClient.update({
        resourceType: resource.resourceType,
        id: resource.id,
        body: fixupFHIR(resource),
      });
      if (!isFhirError(response)) {
        await createProvenance("UPDATE", response, requestContext);
      }
    } else {
      // Utilize the FHIR write-back client for creating resources
      response = await fhirWriteBackClient.create({
        resourceType: resource.resourceType,
        body: fixupFHIR(resource),
      });
      await createProvenance("CREATE", response, requestContext);

      if (!isFhirError(response)) {
        resourceModified.id = response.id;
      }
    }
    Telemetry.reportActionSuccess(`${resource.resourceType}.${action}`);
    requestContext.onResourceSave(resourceModified, action);

    // Read-Your-Writes!
    // Wait for FQS to have the latest version of the resource.
    // This way callers can safely refetch/invalidateQueries
    // and be sure to get fresh data from FQS.
    if (isFHIRDomainResource(response) && response.id && response.meta?.lastUpdated) {
      await longPollFQS(
        requestContext,
        resource.resourceType,
        response.id,
        response.meta.lastUpdated
      );
    }

    return response;
  } catch (err) {
    Telemetry.reportActionFailure(`${resource.resourceType}.${action}`);
    Telemetry.logError(err as Error);
    requestContext.onResourceSave(resourceModified, action, err as Error);
    return err;
  }
}
