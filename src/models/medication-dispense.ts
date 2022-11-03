import { getPerformingOrganization } from "@/fhir/medication";
import type { ResourceMap } from "@/fhir/types";
import { compact } from "lodash/fp";

export class MedicationDispenseModel {
  readonly resource: fhir4.MedicationDispense;

  readonly includedResources?: ResourceMap;

  constructor(
    medicationDispense: fhir4.MedicationDispense,
    includedResources?: ResourceMap
  ) {
    this.resource = medicationDispense;
    this.includedResources = includedResources;
  }

  get id(): string {
    return this.resource.id || "";
  }

  get resourceType(): "MedicationDispense" {
    return this.resource.resourceType;
  }

  get performer(): fhir4.Organization | undefined {
    return getPerformingOrganization(this.resource, this.includedResources);
  }

  get performerDetails() {
    const { performer } = this;
    return {
      name: performer?.name ?? "",
      address: performer?.address?.[0].text ?? "",
      telecom: performer?.telecom?.[0].value ?? "",
    };
  }

  get status(): string {
    return this.resource.status;
  }

  get quantityDisplay() {
    const { value, unit } = this.resource.quantity || {};
    return compact([value, unit]).join(" ");
  }

  get supplied(): string {
    const { value, unit = "days" } = this.resource.daysSupply || {};
    if (!value) {
      return "";
    }
    return `${value} ${unit}`;
  }
}
