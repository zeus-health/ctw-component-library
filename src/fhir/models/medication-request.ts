import { FHIRModel } from "./fhir-model";

export class MedicationRequestModel extends FHIRModel<fhir4.MedicationRequest> {
  get includedRequester(): fhir4.Resource | undefined {
    const { includedResources = {} } = this;
    const requesterReference = this.resource.requester?.reference;
    if (requesterReference && requesterReference in includedResources) {
      return includedResources[requesterReference];
    }
    return undefined;
  }
}
