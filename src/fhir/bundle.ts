import type { ResourceMap, ResourceType, ResourceTypeString } from "./types";
import type { FhirResource } from "fhir-kit-client";

export const isBundle = (resource: fhir4.Resource): resource is fhir4.Bundle =>
  resource.resourceType === "Bundle";

// Returns an array of resource entries from bundle filtered
// down to the specified resourceType.
export function getResources<T extends ResourceTypeString>(
  bundle: FhirResource,
  resourceType: T
): ResourceType<T>[] {
  const resources: FhirResource[] = [];
  if (isBundle(bundle)) {
    bundle.entry?.forEach((entry) => {
      if (entry.resource?.resourceType === resourceType) {
        resources.push(entry.resource);
      }
    });
  }

  return resources as ResourceType<T>[];
}

// Returns a map from resourceType/id -> resource.
export function bundleToResourceMap(bundle: FhirResource): ResourceMap {
  const resources = {} as ResourceMap;
  if (isBundle(bundle)) {
    bundle.entry?.forEach((entry) => {
      const { resource } = entry;
      if (!resource) {
        return;
      }
      const path = `${resource.resourceType}/${resource.id}`;
      resources[path] = resource as fhir4.Resource;
    });
  }

  return resources;
}

// Returns a map from resourceType/id -> resource for all
// resources marked with search.mode == "include" which means
// they are in the result due to a "_include" param.
export function getIncludedResources(bundle: FhirResource): ResourceMap {
  const resources = {} as ResourceMap;
  if (isBundle(bundle)) {
    bundle.entry?.forEach((entry) => {
      const { resource, search } = entry;
      if (!resource || search?.mode !== "include") {
        return;
      }
      const path = `${resource.resourceType}/${resource.id}`;
      resources[path] = resource as fhir4.Resource;
    });
  }

  return resources;
}

// Merges the included resources maps from multiple bundles into one.
export function getMergedIncludedResources(
  bundles: FhirResource[]
): ResourceMap {
  return Object.assign(
    {},
    ...bundles.map((bundle) => getIncludedResources(bundle))
  ) as ResourceMap;
}
