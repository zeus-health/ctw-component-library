import { FHIRModel } from "./fhir-model";

export class OrganizationModel extends FHIRModel<fhir4.Organization> {
  kind = "Organization" as const;

  get name(): string | undefined {
    return this.resource.name;
  }
}
