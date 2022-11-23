import { getPerformingOrganization } from "@/fhir/medication";
import { FHIRModel } from "./fhir-model";
import { findReference } from "@/fhir/resource-helper";
import { PractitionerModel } from "@/fhir/models/practitioner";

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

  get quantityDisplay() {
    const { value = "", unit = "units" } = this.resource.quantity || {};
    if (value === "") {
      return "";
    }
    return `${value} ${unit}`;
  }

  get supplied() {
    const { value = "", unit = "days" } = this.resource.daysSupply || {};
    if (value === "") {
      return "";
    }
    return `${value} ${unit}`;
  }
}
