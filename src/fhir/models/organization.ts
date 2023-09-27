import { FHIRModel } from "./fhir-model";
import { formatPhoneNumber } from "../formatters";

export class OrganizationModel extends FHIRModel<fhir4.Organization> {
  kind = "Organization" as const;

  get name(): string | undefined {
    return this.resource.name;
  }

  get phone(): string | undefined {
    const phone = this.resource.telecom?.find((t) => t.system === "phone");
    return formatPhoneNumber(phone?.value);
  }
}
