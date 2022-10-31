import { compact } from "lodash/fp";
import { getPerformingOrganization } from "@/fhir/medication";
import type { ResourceMap } from "@/fhir/types";
import { findReference } from "@/fhir/resource-helper";

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
      foundPerformer: !!performer,
      name: performer?.name ?? "",
      address: performer?.address?.[0].text ?? "",
      telecom: performer?.telecom?.[0].value ?? "",
    };
  }

  get status(): string {
    return this.resource.status;
  }

  get dosageInstruction() {
    return this.resource.dosageInstruction?.[0].text;
  }

  get quantityDisplay() {
    const { value, unit } = this.resource.quantity || {};
    return compact([value, unit]).join(" ");
  }

  get supplied(): string {
    const { value, unit = "day" } = this.resource.daysSupply || {};
    if (!value) {
      return "";
    }
    return `${value} ${unit}`;
  }

  // @todo it's possible we won't have med dispense requests and use an extension instead, but don't yet know what extension
  get refillsRemaining(): number {
    const list = Object.values(this.includedResources || {});

    for (let i = 0; i < list.length; i += 1) {
      const included = list[i];
      if (included.resourceType === "MedicationDispenseRequest") {
        const x = included as fhir4.MedicationRequestDispenseRequest;
        return x.numberOfRepeatsAllowed || 0;
      }
    }
    return 0;
  }
}
