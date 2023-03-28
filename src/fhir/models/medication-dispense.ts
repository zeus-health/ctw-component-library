import { formatDateISOToLocal } from "../formatters";
import { FHIRModel } from "./fhir-model";
import {
  getIdentifyingRxNormCode,
  getMedicationDisplayName,
  getPerformingOrganization,
} from "@/fhir/medication";
import { PractitionerModel } from "@/fhir/models/practitioner";
import { findReference } from "@/fhir/resource-helper";

export class MedicationDispenseModel extends FHIRModel<fhir4.MedicationDispense> {
  kind = "MedicationDispense" as const;

  get includedPerformer(): string | undefined {
    const reference = this.resource.performer?.[0]?.actor.reference;

    const practitioner = findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );

    if (practitioner) {
      return new PractitionerModel(practitioner).fullName;
    }
    return this.resource.performer?.[0]?.actor.display;
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

  get quantityDisplay(): string | undefined {
    const { value, unit = "units" } = this.resource.quantity || {};
    return value ? `${value} ${unit}` : undefined;
  }

  get rxNorm(): string | undefined {
    return getIdentifyingRxNormCode(this.resource, this.includedResources);
  }

  get supplied(): string | undefined {
    const { value, unit = "days" } = this.resource.daysSupply || {};
    return value ? `${value} ${unit}` : undefined;
  }

  get medicationDisplayName() {
    return getMedicationDisplayName(this.resource, this.includedResources);
  }

  get whenHandedOver() {
    return formatDateISOToLocal(this.resource.whenHandedOver);
  }

  get whenPrepared() {
    return formatDateISOToLocal(this.resource.whenPrepared);
  }
}
