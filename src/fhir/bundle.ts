import type { ResourceArrayMap, ResourceMap, ResourceType, ResourceTypeString } from "./types";
import type { FhirResource } from "fhir-kit-client";
import { last } from "@/utils/nodash";

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
      } else if (entry.resource?.resourceType === "Bundle") {
        // Recursively search for resources in nested bundles.
        resources.push(...getResources(entry.resource, resourceType));
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

// Returns a map from basic resoure's subject id to an array
// of associated basic resources.
// This way we can easily lookup a specific resources associated basic resources.
export function getIncludedBasics(bundle: FhirResource): ResourceArrayMap {
  const resources = new Map() as ResourceArrayMap;
  if (!isBundle(bundle) || !bundle.entry) {
    return resources;
  }

  bundle.entry.forEach((entry) => {
    const { resource, search } = entry;
    if (!resource || search?.mode !== "include" || resource.resourceType !== "Basic") {
      return;
    }

    const refId = last(resource.subject?.reference?.split("/"));
    if (!refId) return;

    if (!resources.has(refId)) {
      resources.set(refId, []);
    }
    resources.get(refId)?.push(resource);
  });

  return resources;
}

// Merges the included resources maps from multiple bundles into one.
export function getMergedIncludedResources(bundles: FhirResource[]): ResourceMap {
  return Object.assign({}, ...bundles.map((bundle) => getIncludedResources(bundle))) as ResourceMap;
}
