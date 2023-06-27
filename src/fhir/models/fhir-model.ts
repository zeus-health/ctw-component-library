import { Basic, Resource } from "fhir/r4";
import {
  SYSTEM_ENRICHMENT,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_OWNER,
  SYSTEM_ZUS_PROFILE_ACTION,
  SYSTEM_ZUS_THIRD_PARTY,
} from "../system-urls";
import { ResourceMap, ResourceTypeString } from "../types";
import { find, orderBy, some, startCase } from "@/utils/nodash";

export abstract class FHIRModel<T extends fhir4.Resource> {
  public resource: T;

  // This is a string that is used to identify the type of model and
  // allows us to use a switch statement to determine the type of model.
  abstract readonly kind: string;

  readonly includedResources?: ResourceMap;

  private revIncludedResources?: Resource[];

  constructor(resource: T, includedResources?: ResourceMap, revIncludes?: Resource[]) {
    this.resource = resource;
    this.includedResources = includedResources;
    this.revIncludedResources = revIncludes;
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

  get isDismissed(): boolean {
    const basic = this.getLatestBasicResourceByActions(["archive", "unarchive"]);
    return some(basic?.code.coding, {
      system: SYSTEM_ZUS_PROFILE_ACTION,
      code: "archive",
    });
  }

  get isRead(): boolean {
    const basic = this.getLatestBasicResourceByActions(["read", "unread"]);
    return some(basic?.code.coding, {
      system: SYSTEM_ZUS_PROFILE_ACTION,
      code: "read",
    });
  }

  // Returns true if this resource is a summary/lens resource.
  get isSummaryResource(): boolean {
    return find(this.resource.meta?.tag, { system: SYSTEM_SUMMARY }) !== undefined;
  }

  get resourceType(): ResourceTypeString {
    return this.resource.resourceType as ResourceTypeString;
  }

  get resourceTypeTitle(): string {
    return startCase(this.resourceType);
  }

  get revIncludes(): Resource[] | undefined {
    return this.revIncludedResources;
  }

  set revIncludes(resources: Resource[] | undefined) {
    this.revIncludedResources = resources;
  }

  // Returns the latest Basic resource that has a code that matches
  // one of profileActions.
  // This way we get the latest action for either "archive" or "unarchive".
  // In practice, there should only be a single Basic resource, but
  // we need to handle the case where there may be several.
  getLatestBasicResourceByActions(profileActions: string[]): Basic | undefined {
    const ordered = orderBy(this.revIncludes, "meta.lastUpdated", "desc") as Resource[];
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

  // Returns true if this resource is owned by the specified builder.
  ownedByBuilder(builderId: string): boolean {
    try {
      if (this.resource.meta?.tag?.some((tag) => tag.system === SYSTEM_ZUS_THIRD_PARTY)) {
        return false;
      }
      const ownerTag = this.resource.meta?.tag?.find((tag) => tag.system === SYSTEM_ZUS_OWNER);
      return ownerTag?.code?.split("/")[1] === builderId;
    } catch (error) {
      throw new Error("Expected builder owner tag missing or malformed.");
    }
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
