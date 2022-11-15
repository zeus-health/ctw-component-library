import { ResourceMap } from "../types";

export abstract class FHIRModel<T extends fhir4.Resource> {
  public resource: T;

  readonly includedResources?: ResourceMap;

  constructor(resource: T, includedResources?: ResourceMap) {
    this.resource = resource;
    this.includedResources = includedResources;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get resourceType(): string {
    return this.resource.resourceType;
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
