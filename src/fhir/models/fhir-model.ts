import { Basic, Resource } from "fhir/r4";
import { SYSTEM_ENRICHMENT, SYSTEM_SUMMARY, SYSTEM_ZUS_PROFILE_ACTION } from "../system-urls";
import { ResourceMap } from "../types";
import { find, orderBy, some, startCase } from "@/utils/nodash";

export abstract class FHIRModel<T extends fhir4.Resource> {
  public resource: T;

  // This is a string that is used to identify the type of model and
  // allows us to use a switch statement to determine the type of model.
  abstract readonly kind: string;

  readonly includedResources?: ResourceMap;

  readonly revIncludes?: Resource[];

  constructor(resource: T, includedResources?: ResourceMap, revIncludes?: Resource[]) {
    this.resource = resource;
    this.includedResources = includedResources;
    this.revIncludes = revIncludes;
  }

  get id(): string {
    return this.resource.id || "";
  }

  // key is used to uniquely identify rows in our resource table
  get key(): string {
    return this.id;
  }

  get versionId(): string {
    return this.resource.meta?.versionId || "";
  }

  get isArchived(): boolean {
    const basic = this.getLatestBasicResourceByActions(["archive", "unarchive"]);
    return some(basic?.code.coding, { code: "archive" });
  }

  // Returns true if this resource is a summary/lens resource.
  get isSummaryResource(): boolean {
    return find(this.resource.meta?.tag, { system: SYSTEM_SUMMARY }) !== undefined;
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }

  get resourceTypeTitle(): string {
    return startCase(this.resourceType);
  }

  // Returns the latest Basic resource that has a code that matches
  // one of profileActions.
  // This way we get the latest action for either "archive" or "unarchive".
  // In practice, there should only be a single Basic resource, but
  // we need to handle the case where there may be several.
  getLatestBasicResourceByActions(profileActions: string[]): Basic | undefined {
    const ordered = orderBy(this.revIncludes, "meta.lastUpdated", "desc");
    return find(ordered, (resource) => {
      if (resource.resourceType === "Basic") {
        return some(
          (resource as Basic).code.coding,
          (coding) =>
            coding.system === SYSTEM_ZUS_PROFILE_ACTION &&
            profileActions.includes(coding.code ?? "")
        );
      }
      return false;
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
