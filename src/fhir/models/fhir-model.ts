import { Basic, Resource } from "fhir/r4";
import { formatDateISOToLocal } from "../formatters";
import {
  SYSTEM_ENRICHMENT,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_CREATED_AT,
  SYSTEM_ZUS_OWNER,
  SYSTEM_ZUS_PROFILE_ACTION,
  SYSTEM_ZUS_THIRD_PARTY,
  SYSTEM_ZUS_UNIVERSAL_ID,
} from "../system-urls";
import { isFHIRDomainResource, ResourceMap, ResourceTypeString } from "../types";
import { find, orderBy, some, startCase } from "@/utils/nodash";

export abstract class FHIRModel<T extends fhir4.Resource> {
  public resource: T;

  // This is a string that is used to identify the type of model and
  // allows us to use a switch statement to determine the type of model.
  abstract readonly kind: string;

  readonly includedResources?: ResourceMap;

  private revIncludedResources?: Resource[];

  private optimisticIsRead?: boolean;

  private optimisticIsDismissed?: boolean;

  constructor(resource: T, includedResources?: ResourceMap, revIncludes?: Resource[]) {
    this.resource = resource;
    this.includedResources = includedResources;
    this.revIncludedResources = revIncludes;
  }

  get createdAt(): string | undefined {
    return find(this.resource.meta?.extension, { url: SYSTEM_ZUS_CREATED_AT })?.valueInstant;
  }

  get createdAtDisplay(): string | undefined {
    return formatDateISOToLocal(this.createdAt);
  }

  get lastUpdated(): string | undefined {
    return this.resource.meta?.lastUpdated || this.createdAt;
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
    if (this.optimisticIsDismissed !== undefined) {
      return this.optimisticIsDismissed;
    }

    const basic = this.getLatestBasicResourceByActions(["archive", "unarchive"]);
    return some(basic?.code.coding, {
      system: SYSTEM_ZUS_PROFILE_ACTION,
      code: "archive",
    });
  }

  // Optimistically toggle the isDismiss state.
  // This is useful to be able to change the state of the UI
  // without having to wait for the toggleRead API call.
  optimisticToggleIsDismiss(): void {
    this.optimisticIsDismissed = !this.isDismissed;
  }

  get isRead(): boolean {
    if (this.optimisticIsRead !== undefined) {
      return this.optimisticIsRead;
    }
    const basic = this.getLatestBasicResourceByActions(["read", "unread"]);
    const isRead = some(basic?.code.coding, {
      system: SYSTEM_ZUS_PROFILE_ACTION,
      code: "read",
    });
    return isRead;
  }

  // Optimistically toggle the isRead state.
  // This is useful to be able to change the state of the UI
  // without having to wait for the toggleRead API call.
  optimisticToggleIsRead(): void {
    this.optimisticIsRead = !this.isRead;
  }

  // Returns true if this resource is a summary/lens resource.
  get isSummaryResource(): boolean {
    return find(this.resource.meta?.tag, { system: SYSTEM_SUMMARY }) !== undefined;
  }

  get isThirdPartyData(): boolean {
    return this.resource.meta?.tag?.some((t) => t.system === SYSTEM_ZUS_THIRD_PARTY) ?? false;
  }

  // If the data came from a third party data source then return that name
  get thirdPartyDataSourceName(): string | undefined {
    return this.resource.meta?.tag?.find((t) => t.system === SYSTEM_ZUS_THIRD_PARTY)?.code;
  }

  get patientUPID(): string | undefined {
    if (isFHIRDomainResource(this.resource)) {
      return find(this.resource.extension, { url: SYSTEM_ZUS_UNIVERSAL_ID })?.valueString;
    }
    return undefined;
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
    if (this.resource.meta?.tag?.some((tag) => tag.system === SYSTEM_ZUS_THIRD_PARTY)) {
      return false;
    }
    const ownerTag = this.resource.meta?.tag?.find((tag) => tag.system === SYSTEM_ZUS_OWNER);
    const splitTag = ownerTag?.code?.split("/");

    if (splitTag?.length !== 2) {
      return false;
    }
    return splitTag[1] === builderId;
  }

  // Returns a string that would setup this model.
  //   E.g. "new ConditionModel({...resource})"
  // Helpful for debugging / console logging.
  // This way we get copyable code for the model
  // instead of "[object Object]".
  toString() {
    const modelName = this.constructor.name;
    return `new ${modelName}(${JSON.stringify(this.resource, null, 2)}\n)`;
  }
}
