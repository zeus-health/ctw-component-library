import { Basic, Resource } from "fhir/r4";
import {
  SYSTEM_ENRICHMENT,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_PROFILE_ACTION,
} from "../system-urls";
import { ResourceMap } from "../types";
import { find, startCase } from "@/utils/nodash";

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

  get isArchived(): boolean {
    return this.getBasicResourceByAction("archive") !== undefined;
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

  get resourceTypeTitle(): string {
    return startCase(this.resourceType);
  }

  getBasicResourceByAction(profileAction: string): Basic | undefined {
    return find(this.revIncludes, {
      resourceType: "Basic",
      code: {
        coding: [{ system: SYSTEM_ZUS_PROFILE_ACTION, code: profileAction }],
      },
    }) as Basic | undefined;
  }

  // Returns true if this resource is enriched with additional data
  // from Zus enrichment.
  isEnriched(): boolean {
    return JSON.stringify(this.resource).includes(SYSTEM_ENRICHMENT);
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
