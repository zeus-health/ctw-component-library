import { find } from "lodash";
import type { ResourceMap, ResourceType, ResourceTypeString } from "./types";

// Returns the referenced resource if there is one.
// Checks both the contained resources AND any included resources map.
// NOTE: Throws error if reference exists but we couldn't find it!
//       See throw note below for details.
export function findReference<T extends ResourceTypeString>(
  resourceType: T,
  contained: fhir4.FhirResource[] | undefined,
  includedResources: ResourceMap | undefined,
  reference: string | undefined
): ResourceType<T> | undefined {
  if (!reference) {
    return undefined;
  }

  if (reference.startsWith("#")) {
    return find(contained, {
      id: reference.substring(1), // Remove preceding # when looking up contained resource.
      resourceType,
    }) as ResourceType<T> | undefined;
  }

  if (includedResources?.[reference]?.resourceType === resourceType) {
    return includedResources[reference] as ResourceType<T>;
  }

  // TIP: Are you missing a _include or _include:iterate in
  //      the FHIR request!?
  // Calling `findReference` implies we are intending to be able
  // to find the reference and use it. The only reason why this
  // wouldn't work for an existing reference is if we forgot
  // to do a _include or _include:iterate!
  // NOTE: It's also possible that we cannot find a reference
  // because user does not have permission to it. This can happen
  // in CPR where user can see a resource but not one of its references.
  return undefined;
}
