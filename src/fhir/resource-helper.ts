import type { ResourceMap, ResourceType, ResourceTypeString } from "./types";
import { find } from "@/utils/nodash";

type Fhir4Reference = fhir4.Reference & { resource?: fhir4.FhirResource };

// Returns the referenced resource if there is one.
// Checks both the contained resources AND any included resources map.
// NOTE: Throws error if reference exists but we couldn't find it!
//       See throw note below for details.
export function findReference<T extends ResourceTypeString>(
  resourceType: T,
  contained: fhir4.FhirResource[] | undefined,
  includedResources: ResourceMap | undefined,
  reference: Fhir4Reference | undefined
): ResourceType<T> | undefined {
  if (!reference) {
    return undefined;
  }

  if (reference.resource) {
    return reference.resource as ResourceType<T>;
  }

  if (reference.reference?.startsWith("#")) {
    // TODO: Remove this once we no longer support ODS, as this format is specific to ODS/FHIR.
    let found = find(contained, {
      id: reference.reference.substring(1), // Remove preceding # when looking up contained resource.
      resourceType,
    }) as ResourceType<T> | undefined;
    if (found) {
      return found;
    }

    // FQS returns contained resources nested another level deep (e.g. as {resource: {}} vs just {}),
    // so we need to look there for contained values.
    found = find(contained, {
      resource: {
        id: reference.reference.substring(1), // Remove preceding # when looking up contained resource.
        resourceType,
      },
    }) as ResourceType<T> | undefined;
    if (found) {
      // @ts-ignore: We need to return the unnested resource here vs the nested one.
      return found.resource;
    }
    return undefined;
  }

  if (
    reference.reference &&
    includedResources?.[reference.reference]?.resourceType === resourceType
  ) {
    return includedResources[reference.reference] as ResourceType<T>;
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
