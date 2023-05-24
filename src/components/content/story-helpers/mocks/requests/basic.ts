import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import { FAKE_BUILDER_TAG } from "../../ids";
import { BundleCaches } from "../../types";
import { ResourceTypeString } from "@/fhir/types";

// Mocks the creation of a new fhir Basic resource
// and updates the resource cache.
export function getMockBasicPost(resourceType: ResourceTypeString, cache: BundleCaches) {
  return rest.post("https://api.dev.zusapi.com/fhir/Basic", async (req, res, ctx) => {
    const newBasicResource = (await req.json()) as fhir4.Basic;
    if (newBasicResource.subject?.type !== resourceType) {
      // The ZusAggregatedProfile component has multiple tabs mocking fhir
      // Basic resources. We only want to handle this specific resource type here.
      return undefined;
    }
    newBasicResource.id = uuidv4();
    newBasicResource.meta = {
      tag: [FAKE_BUILDER_TAG],
    };
    cache.outside.entry?.push({
      resource: newBasicResource,
      search: { mode: "include" },
    });

    // eslint-disable-next-line no-param-reassign
    cache.outside.total = cache.outside.entry?.length;
    return res(ctx.delay(500), ctx.status(200), ctx.json(newBasicResource));
  });
}

// Mocks updating a fhir Basic resource
// and updates the resource cache.
export function getMockBasicPut(cache: BundleCaches) {
  return rest.put("https://api.dev.zusapi.com/fhir/Basic/:basicId", async (req, res, ctx) => {
    const basic = await req.json();
    const index = cache.outside.entry?.findIndex((entry) => entry.resource?.id === basic.id);
    if (index !== undefined && cache.outside.entry?.[index]) {
      // eslint-disable-next-line no-param-reassign
      cache.outside.entry[index].resource = basic;
    }
    return res(ctx.delay(500), ctx.status(200), ctx.json(basic));
  });
}
