import { FHIRModel } from "./fhir-model";
import { findReference } from "@/fhir/resource-helper";

export class MedicationRequestModel extends FHIRModel<fhir4.MedicationRequest> {
  get includedRequester(): fhir4.Resource | undefined {
    const reference = this.resource.requester?.reference;

    return findReference(
      "Practitioner",
      this.resource.contained,
      this.includedResources,
      reference
    );
  }
}
