import { FHIRModel } from "./fhir-model";
import { getPerformingOrganization } from "@/fhir/medication";
import { PractitionerModel } from "@/fhir/models/practitioner";
import { findReference } from "@/fhir/resource-helper";

export class MedicationDispenseModel extends FHIRModel<fhir4.MedicationDispense> {
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

  get supplied(): string | undefined {
    const { value, unit = "days" } = this.resource.daysSupply || {};
    return value ? `${value} ${unit}` : undefined;
  }
}
