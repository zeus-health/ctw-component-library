import { getPerformingOrganization } from "@/fhir/medication";
import { compact } from "lodash/fp";
import { FHIRModel } from "./fhir-model";

export class MedicationDispenseModel extends FHIRModel<fhir4.MedicationDispense> {
  get includedPerformer(): fhir4.Resource | undefined {
    const { includedResources = {} } = this;
    const reference = this.resource.performer?.[0]?.actor.reference;
    if (reference && reference in includedResources) {
      return includedResources[reference];
    }
    return undefined;
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
