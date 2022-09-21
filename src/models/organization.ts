import type { ResourceMap } from "../fhir/types";

export class OrganizationModel {
  private resource: fhir4.Organization;

  private includedResources?: ResourceMap;

  constructor(medication: fhir4.Organization, includedResources?: ResourceMap) {
    this.resource = medication;
    this.includedResources = includedResources;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get name(): string | undefined {
    return this.resource.name;
  }

  get resourceType(): string {
    return this.resource.resourceType;
  }
}
