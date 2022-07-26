import { Basic, Resource } from "fhir/r4";
import { find } from "lodash";
import { SYSTEM_SUMMARY, SYSTEM_ZUS_PROFILE_ACTION } from "../system-urls";
import { ResourceMap } from "../types";

export abstract class FHIRModel<T extends fhir4.Resource> {
  public resource: T;

  readonly includedResources?: ResourceMap;

  readonly revIncludes?: Resource[];

  constructor(
    resource: T,
    includedResources?: ResourceMap,
    revIncludes?: Resource[]
  ) {
    this.resource = resource;
    this.includedResources = includedResources;
    this.revIncludes = revIncludes;
  }

  get id(): string {
    return this.resource.id || "";
  }

  // Returns true if this resource is a summary/lens resource.
  get isSummaryResource(): boolean {
    return (
      find(this.resource.meta?.tag, { system: SYSTEM_SUMMARY }) !== undefined
    );
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }

  getBasicResourceByAction(profileAction: string): Basic | undefined {
    return find(this.revIncludes, {
      resourceType: "Basic",
      meta: {
        tag: [{ system: SYSTEM_ZUS_PROFILE_ACTION, code: profileAction }],
      },
    }) as Basic | undefined;
  }

  // Returns a string that would setup this model.
  //   E.g. "new ConditionModel({...resource})"
  // Used by Storybook in "show code" feature.
  // This way we get copyable code for the model
  // instead of "[object Object]".
  toString() {
    const modelName = this.constructor.name;
    return `new ${modelName}(${JSON.stringify(this.resource, null, 2)}\n)`;
  }
}
