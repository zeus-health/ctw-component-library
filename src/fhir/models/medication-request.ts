import { FHIRModel } from "./fhir-model";
import { findReference } from "@/fhir/resource-helper";
import { PractitionerModel } from "@/fhir/models/practitioner";

export class MedicationRequestModel extends FHIRModel<fhir4.MedicationRequest> {
  get includedRequester(): string | undefined {
    const reference = this.resource.requester?.reference;

    const practitioner = findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );

    if (practitioner) {
      return new PractitionerModel(practitioner).fullName;
    }
    return this.resource.requester?.display;
  }
}
